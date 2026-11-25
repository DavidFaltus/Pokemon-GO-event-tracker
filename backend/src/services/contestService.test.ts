import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { dataStore } from '../dataStore';
import {
  CONTESTS_STORE_KEY,
  verifyContestCredentials,
  issueContestAdminToken,
  isValidContestAdminToken,
  upsertContest,
  deleteContest,
  getPublicContestsData,
  addContestEntry,
  deleteContestEntry,
  drawContestWinners,
  updateContestHubSettings,
  submitInventoryComboEntry,
  submitStatsDeltaBaseline,
  submitStatsDeltaFinal,
  updateContestEntryStatus,
} from './contestService';

describe('Contest Service', () => {
  const originalUser = process.env.CONTEST_ADMIN_USERNAME;
  const originalPass = process.env.CONTEST_ADMIN_PASSWORD;
  const originalUsers = process.env.CONTEST_ADMIN_USERS;

  beforeEach(async () => {
    await dataStore.delete(CONTESTS_STORE_KEY);
    delete process.env.CONTEST_ADMIN_USERNAME;
    delete process.env.CONTEST_ADMIN_PASSWORD;
    delete process.env.CONTEST_ADMIN_USERS;
  });

  afterEach(async () => {
    await dataStore.delete(CONTESTS_STORE_KEY);
    if (originalUser !== undefined) process.env.CONTEST_ADMIN_USERNAME = originalUser;
    else delete process.env.CONTEST_ADMIN_USERNAME;
    if (originalPass !== undefined) process.env.CONTEST_ADMIN_PASSWORD = originalPass;
    else delete process.env.CONTEST_ADMIN_PASSWORD;
    if (originalUsers !== undefined) process.env.CONTEST_ADMIN_USERS = originalUsers;
    else delete process.env.CONTEST_ADMIN_USERS;
  });

  describe('Dedicated username/password authentication', () => {
    it('verifies default fallback credentials and rejects wrong username or password', () => {
      expect(verifyContestCredentials('admin', 'admin123')).toBe(true);
      expect(verifyContestCredentials('ADMIN', 'admin123')).toBe(true);
      expect(verifyContestCredentials('admin', 'wrong-pass')).toBe(false);
      expect(verifyContestCredentials('wrong-user', 'admin123')).toBe(false);
    });

    it('honors CONTEST_ADMIN_USERNAME and CONTEST_ADMIN_PASSWORD env overrides', () => {
      process.env.CONTEST_ADMIN_USERNAME = 'brno-leader';
      process.env.CONTEST_ADMIN_PASSWORD = 'SecretPassword#42';

      expect(verifyContestCredentials('brno-leader', 'SecretPassword#42')).toBe(true);
      expect(verifyContestCredentials('admin', 'admin123')).toBe(false);

      const token = issueContestAdminToken('brno-leader');
      expect(isValidContestAdminToken(token)).toBe(true);
      expect(isValidContestAdminToken(`${token}x`)).toBe(false);
      expect(isValidContestAdminToken('invalid.token')).toBe(false);
    });

    it('supports multiple accounts via CONTEST_ADMIN_USERS (pair list and JSON) and revokes removed users', () => {
      process.env.CONTEST_ADMIN_USERS = 'david:HesloDavid1!,petr:HesloPetr2!';

      expect(verifyContestCredentials('david', 'HesloDavid1!')).toBe(true);
      expect(verifyContestCredentials('petr', 'HesloPetr2!')).toBe(true);
      expect(verifyContestCredentials('david', 'HesloPetr2!')).toBe(false);
      expect(verifyContestCredentials('admin', 'admin123')).toBe(false);

      const davidToken = issueContestAdminToken('david');
      const petrToken = issueContestAdminToken('petr');
      expect(isValidContestAdminToken(davidToken)).toBe(true);
      expect(isValidContestAdminToken(petrToken)).toBe(true);

      // Removing petr immediately invalidates petr's token while david stays valid
      process.env.CONTEST_ADMIN_USERS = JSON.stringify({ david: 'HesloDavid1!', jana: 'Tajne3#' });
      expect(isValidContestAdminToken(davidToken)).toBe(true);
      expect(isValidContestAdminToken(petrToken)).toBe(false);
      expect(verifyContestCredentials('jana', 'Tajne3#')).toBe(true);
    });
  });

  describe('Contest CRUD, entries & raffle draw', () => {
    it('creates, updates, filters drafts from public endpoint, and deletes contests', async () => {
      await updateContestHubSettings({
        groupName: 'PoGo Praha',
        hubTitle: 'Pražské soutěže',
        hubSubtitle: 'Testovací podtitul',
      });

      const { contest: draft } = await upsertContest({
        title: 'Skrytý koncept',
        description: 'Jen pro adminy',
        status: 'draft',
      });

      const { contest: active } = await upsertContest({
        title: 'Community Day Shiny Lov',
        description: 'Chyť nejvíce shiny Pokémonů!',
        rules: ['Screenshot v chatu', 'Platí jen dnešní chycení'],
        prizes: ['1. místo: 500 PokéCoins', '2. místo: Kód na Inkubátor'],
        status: 'active',
        registrationEnabled: true,
        motif: { mode: 'pokemon', pokemonDexId: 384, pokemonName: 'Rayquaza', shiny: true },
      });

      const pub = await getPublicContestsData();
      expect(pub.settings.groupName).toBe('PoGo Praha');
      expect(pub.contests).toHaveLength(1);
      expect(pub.contests[0].id).toBe(active.id);
      expect(pub.contests[0].motif.pokemonDexId).toBe(384);
      expect(pub.contests[0].motif.shiny).toBe(true);

      const deleted = await deleteContest(draft.id);
      expect(deleted).toBe(true);
    });

    it('handles participant registration, duplicate prevention, and fair winner draw', async () => {
      const { contest } = await upsertContest({
        title: 'Raid Hodina Tipovačka',
        description: 'Přihlas se do slosování.',
        prizes: ['Hlavní výhra: Lure Module', 'Cena útěchy: Samolepky'],
        status: 'active',
        registrationEnabled: true,
        requireAnswer: true,
        answerPrompt: 'Jaký je tvůj oblíbený Pokémon?',
      });

      await expect(
        addContestEntry(contest.id, { trainerName: 'Ash' })
      ).rejects.toThrow('odpověď');

      const e1 = await addContestEntry(contest.id, {
        trainerName: 'AshKetchum',
        trainerCode: '123456789012',
        answer: 'Pikachu',
      });
      expect(e1.trainerCode).toBe('1234 5678 9012');

      // Duplicate trainer name (case-insensitive) should be rejected
      await expect(
        addContestEntry(contest.id, { trainerName: 'ashketchum', answer: 'Charizard' })
      ).rejects.toThrow('již přihlášen');

      await addContestEntry(contest.id, { trainerName: 'Misty', answer: 'Starmie' });
      await addContestEntry(contest.id, { trainerName: 'Brock', answer: 'Onix' });

      const draw1 = await drawContestWinners(contest.id, {
        count: 2,
        excludeExistingWinners: true,
        saveToWinners: true,
      });

      expect(draw1.totalEligible).toBe(3);
      expect(draw1.drawn).toHaveLength(2);
      expect(draw1.drawn[0].place).toBe(1);
      expect(draw1.drawn[0].prize).toBe('Hlavní výhra: Lure Module');
      expect(draw1.drawn[1].place).toBe(2);
      expect(draw1.contest.winners).toHaveLength(2);

      // Next draw with excludeExistingWinners should only have 1 eligible left
      const draw2 = await drawContestWinners(contest.id, {
        count: 5,
        excludeExistingWinners: true,
        saveToWinners: true,
      });
      expect(draw2.totalEligible).toBe(1);
      expect(draw2.drawn).toHaveLength(1);
      expect(draw2.contest.winners).toHaveLength(3);

      // Delete an entry
      const removed = await deleteContestEntry(contest.id, e1.id);
      expect(removed).toBe(true);
    });

    it('runs 2-phase Stats Delta challenge (case-insensitive pairing, thresholds, negative rejection, approved-only draw)', async () => {
      const now = Date.now();
      const { contest } = await upsertContest({
        title: 'Výzva statistik',
        description: 'Splň alespoň 2 ze 3 statistik.',
        status: 'active',
        contestType: 'stats_delta',
        showQualifiedList: true,
        startDate: new Date(now + 3600_000).toISOString(),
        endDate: new Date(now + 7200_000).toISOString(),
        statsDeltaConfig: {
          matchMode: 'min_count',
          minMetricsRequired: 2,
          metrics: [
            { id: 'distance_walked', label: 'Distance walked', unit: 'km', enabled: true, threshold: 5, allowDecimal: true },
            { id: 'pokemon_caught', label: 'Pokémon caught', unit: 'ks', enabled: true, threshold: 50 },
            { id: 'custom_raids', label: 'Vyhrané raidy', unit: 'ks', enabled: true, threshold: 3, isCustom: true },
          ],
        },
      });

      // Phase 1: Ash & Misty submit baselines
      const ashBase = await submitStatsDeltaBaseline(contest.id, {
        trainerName: 'AshKetchum',
        values: { distance_walked: 100.5, pokemon_caught: 1000, custom_raids: 10 },
      });
      expect(ashBase.statsPhase).toBe('baseline_only');
      expect(ashBase.status).toBe('pending_review');

      await submitStatsDeltaBaseline(contest.id, {
        trainerName: 'Misty',
        values: { distance_walked: 50, pokemon_caught: 500, custom_raids: 5 },
      });

      // Negative delta is rejected without locking
      await expect(
        submitStatsDeltaFinal(contest.id, {
          trainerName: 'ashketchum', // case-insensitive!
          values: { distance_walked: 99, pokemon_caught: 1060, custom_raids: 14 },
        })
      ).rejects.toThrow('nižší než startovní');

      // Ash qualifies (meets 2 of 3: pokemon_caught +60, custom_raids +4)
      const ashFinal = await submitStatsDeltaFinal(contest.id, {
        trainerName: 'ASHKETCHUM',
        values: { distance_walked: 102.0, pokemon_caught: 1060, custom_raids: 14 },
      });
      expect(ashFinal.status).toBe('approved');
      expect(ashFinal.deltas?.pokemon_caught).toBe(60);
      expect(ashFinal.metMetrics).toEqual(['pokemon_caught', 'custom_raids']);

      // Re-submitting Phase 2 after completion is locked
      await expect(
        submitStatsDeltaFinal(contest.id, {
          trainerName: 'AshKetchum',
          values: { distance_walked: 200, pokemon_caught: 2000, custom_raids: 50 },
        })
      ).rejects.toThrow('uzamčeny');

      // Misty fails (meets only 1 of 3)
      const mistyFinal = await submitStatsDeltaFinal(contest.id, {
        trainerName: 'misty',
        values: { distance_walked: 56, pokemon_caught: 510, custom_raids: 5 },
      });
      expect(mistyFinal.status).toBe('rejected');

      // Raffle must ONLY draw from approved entries (Ash, never Misty!)
      const draw = await drawContestWinners(contest.id, { count: 5, saveToWinners: false });
      expect(draw.totalEligible).toBe(1);
      expect(draw.drawn[0].trainerName).toBe('AshKetchum');

      // Public participants list exposes ALL entries with their current status sorted approved -> rejected
      const pubBeforeOverride = await getPublicContestsData();
      expect(pubBeforeOverride.contests[0].participants).toEqual([
        { trainerName: 'AshKetchum', status: 'approved', statsPhase: 'completed' },
        { trainerName: 'Misty', status: 'rejected', statsPhase: 'completed' },
      ]);

      // Admin manual override can approve Misty
      const overridden = await updateContestEntryStatus(contest.id, mistyFinal.id, 'approved');
      expect(overridden?.status).toBe('approved');

      const pub = await getPublicContestsData();
      expect(pub.contests[0].qualifiedCount).toBe(2);
      expect(pub.contests[0].qualifiedTrainers).toContain('AshKetchum');
      expect(pub.contests[0].qualifiedTrainers).toContain('Misty');
    });

    it('blocks Stats Delta Phase 1 between startDate and endDate while allowing Phase 2, and blocks Inventory Combo outside startDate..endDate', async () => {
      const now = Date.now();
      const { contest: statsContest } = await upsertContest({
        title: 'Časované statistiky',
        description: 'Test časování fází',
        status: 'active',
        contestType: 'stats_delta',
        startDate: new Date(now + 3600_000).toISOString(),
        endDate: new Date(now + 7200_000).toISOString(),
        statsDeltaConfig: {
          matchMode: 'all',
          minMetricsRequired: 1,
          metrics: [
            { id: 'pokemon_caught', label: 'Pokémon caught', unit: 'ks', enabled: true, threshold: 10 },
          ],
        },
      });

      // Phase 1 succeeds before startDate
      await submitStatsDeltaBaseline(statsContest.id, {
        trainerName: 'Brock',
        values: { pokemon_caught: 100 },
      });

      // Move startDate into the past (now between Phase 1 and Phase 2)
      await upsertContest(
        {
          ...statsContest,
          startDate: new Date(now - 60_000).toISOString(),
        },
        statsContest.id
      );

      // New Phase 1 submission must be rejected
      await expect(
        submitStatsDeltaBaseline(statsContest.id, {
          trainerName: 'LatePlayer',
          values: { pokemon_caught: 50 },
        })
      ).rejects.toThrow('1. fáze');

      // Phase 2 submission for Brock still succeeds before endDate
      const brockFinal = await submitStatsDeltaFinal(statsContest.id, {
        trainerName: 'Brock',
        values: { pokemon_caught: 120 },
      });
      expect(brockFinal.status).toBe('approved');

      // Inventory Combo before startDate must be rejected
      const { contest: invFuture } = await upsertContest({
        title: 'Budoucí štafeta',
        description: 'Ještě nezačala',
        status: 'active',
        contestType: 'inventory_combo',
        startDate: new Date(now + 3600_000).toISOString(),
        endDate: new Date(now + 7200_000).toISOString(),
        inventoryComboConfig: { ruleMode: 'alphabetical', comboLength: 3, requireAge0: true },
      });

      await expect(
        submitInventoryComboEntry(invFuture.id, {
          trainerName: 'EarlyBird',
          screenshotDataUrl: 'data:image/png;base64,AAAA',
        })
      ).rejects.toThrow('ještě nebylo otevřeno');

      // Inventory Combo after endDate must be rejected
      const { contest: invPast } = await upsertContest({
        title: 'Skončená štafeta',
        description: 'Už skončila',
        status: 'active',
        contestType: 'inventory_combo',
        startDate: new Date(now - 7200_000).toISOString(),
        endDate: new Date(now - 60_000).toISOString(),
        inventoryComboConfig: { ruleMode: 'alphabetical', comboLength: 3, requireAge0: true },
      });

      await expect(
        submitInventoryComboEntry(invPast.id, {
          trainerName: 'LateBird',
          screenshotDataUrl: 'data:image/png;base64,AAAA',
        })
      ).rejects.toThrow('již vypršel');

      // Duplicate nickname (case-insensitive) on active Inventory Combo must be rejected
      const { contest: invActive } = await upsertContest({
        title: 'Aktivní štafeta',
        description: 'Právě běží',
        status: 'active',
        contestType: 'inventory_combo',
        startDate: new Date(now - 60_000).toISOString(),
        endDate: new Date(now + 3600_000).toISOString(),
        inventoryComboConfig: { ruleMode: 'alphabetical', comboLength: 3, requireAge0: true },
      });

      await addContestEntry(invActive.id, { trainerName: 'AshKetchum' }, { addedByAdmin: true });

      await expect(
        submitInventoryComboEntry(invActive.id, {
          trainerName: '  ashketchum  ',
          screenshotDataUrl: 'data:image/png;base64,AAAA',
        })
      ).rejects.toThrow('Povolen je 1 pokus');
    });
  });
});
