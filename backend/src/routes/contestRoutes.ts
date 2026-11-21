import express from 'express';
import { dataStore } from '../dataStore';
import { getOcrMonthlyUsage } from '../services/contestOcrService';
import {
  addContestEntry,
  deleteContest,
  deleteContestEntry,
  drawContestWinners,
  getPublicContestsData,
  getPublicTrainerEntryStatus,
  issueContestAdminToken,
  isValidContestAdminToken,
  loadContestStore,
  revokeContestAdminToken,
  seedSampleContests,
  submitInventoryComboEntry,
  submitStatsDeltaBaseline,
  submitStatsDeltaFinal,
  updateContestEntryStatus,
  updateContestHubSettings,
  upsertContest,
  verifyContestCredentials,
} from '../services/contestService';

type RateLimiterFactory = (
  windowMs: number,
  maxRequests: number
) => express.RequestHandler;

function requireContestAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Vyžadováno přihlášení do administrace soutěží.' });
  }
  const token = authHeader.slice(7).trim();
  if (!isValidContestAdminToken(token)) {
    return res.status(403).json({ error: 'Neplatný nebo vypršelý přístupový token.' });
  }
  next();
}

export function createContestRouter(rateLimit: RateLimiterFactory): express.Router {
  const router = express.Router();

  // Public: list published contests + hub settings
  router.get('/', async (_req, res) => {
    try {
      const data = await getPublicContestsData();
      res.setHeader('Cache-Control', 'no-cache');
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se načíst soutěže.' });
    }
  });

  // Public: check a trainer's own submission status / Phase 1 baseline
  router.get('/:id/my-status', async (req, res) => {
    try {
      const trainerName = String(req.query.trainerName || '').trim();
      if (!trainerName) {
        return res.status(400).json({ error: 'Chybí parametr trainerName.' });
      }
      const status = await getPublicTrainerEntryStatus(req.params.id, trainerName);
      if (!status) {
        return res.status(404).json({ error: 'Soutěž nebyla nalezena.' });
      }
      res.json(status);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se zjistit stav přihlášky.' });
    }
  });

  // Public: submit a classic registration entry
  router.post('/:id/entries', rateLimit(10 * 60 * 1000, 120), async (req, res) => {
    try {
      const entry = await addContestEntry(req.params.id, req.body || {}, {
        addedByAdmin: false,
      });
      res.status(201).json({
        success: true,
        entry: {
          id: entry.id,
          contestId: entry.contestId,
          trainerName: entry.trainerName,
          status: entry.status,
          statusReason: entry.statusReason,
          createdAt: entry.createdAt,
        },
      });
    } catch (err: any) {
      const msg = err?.message || 'Nepodařilo se odeslat přihlášku.';
      const status = msg.includes('nebyla nalezena') ? 404 : 400;
      res.status(status).json({ error: msg });
    }
  });

  // Public: Template 1 — submit Inventářová štafeta screenshot + automatic OCR check
  router.post('/:id/inventory-combo', rateLimit(10 * 60 * 1000, 120), async (req, res) => {
    try {
      const entry = await submitInventoryComboEntry(req.params.id, req.body || {});
      res.status(201).json({
        success: true,
        entry: {
          id: entry.id,
          contestId: entry.contestId,
          trainerName: entry.trainerName,
          status: entry.status,
          statusReason: entry.statusReason,
          ocrResult: entry.ocrResult,
          createdAt: entry.createdAt,
        },
      });
    } catch (err: any) {
      const msg = err?.message || 'Nepodařilo se zpracovat screenshot.';
      const status = msg.includes('nebyla nalezena') ? 404 : 400;
      res.status(status).json({ error: msg });
    }
  });

  // Public: Template 2 (Phase 1) — submit Stats Delta baseline (no screenshot)
  router.post('/:id/stats-baseline', rateLimit(10 * 60 * 1000, 120), async (req, res) => {
    try {
      const entry = await submitStatsDeltaBaseline(req.params.id, req.body || {});
      res.status(201).json({
        success: true,
        entry: {
          id: entry.id,
          contestId: entry.contestId,
          trainerName: entry.trainerName,
          status: entry.status,
          statusReason: entry.statusReason,
          statsPhase: entry.statsPhase,
          baselineValues: entry.baselineValues,
          baselineSubmittedAt: entry.baselineSubmittedAt,
        },
      });
    } catch (err: any) {
      const msg = err?.message || 'Nepodařilo se uložit startovní statistiky.';
      const status = msg.includes('nebyla nalezena') ? 404 : 400;
      res.status(status).json({ error: msg });
    }
  });

  // Public: Template 2 (Phase 2) — submit Stats Delta final values (no screenshot)
  router.post('/:id/stats-final', rateLimit(10 * 60 * 1000, 120), async (req, res) => {
    try {
      const entry = await submitStatsDeltaFinal(req.params.id, req.body || {});
      res.json({
        success: true,
        entry: {
          id: entry.id,
          contestId: entry.contestId,
          trainerName: entry.trainerName,
          status: entry.status,
          statusReason: entry.statusReason,
          statsPhase: entry.statsPhase,
          baselineValues: entry.baselineValues,
          finalValues: entry.finalValues,
          deltas: entry.deltas,
          metMetrics: entry.metMetrics,
          failedMetrics: entry.failedMetrics,
        },
      });
    } catch (err: any) {
      const msg = err?.message || 'Nepodařilo se vyhodnotit finální statistiky.';
      const status = msg.includes('nebyla nalezena') ? 404 : 400;
      res.status(status).json({ error: msg });
    }
  });

  // Admin auth: login with username & password
  router.post('/admin/login', rateLimit(60 * 1000, 15), (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ error: 'Vyplň prosím uživatelské jméno i heslo.' });
    }
    if (!verifyContestCredentials(String(username), String(password))) {
      return res.status(401).json({ error: 'Neplatné uživatelské jméno nebo heslo.' });
    }
    const token = issueContestAdminToken(String(username));
    return res.json({
      success: true,
      token,
      username: String(username).trim(),
    });
  });

  // Admin auth: verify current token
  router.get('/admin/verify', requireContestAuth, (_req, res) => {
    res.json({ valid: true });
  });

  // Admin auth: logout
  router.post('/admin/logout', requireContestAuth, (req, res) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    if (token) revokeContestAdminToken(token);
    res.json({ success: true });
  });

  // Admin: get complete state (settings, all contests incl. drafts, all entries, OCR quota)
  router.get('/admin/state', requireContestAuth, async (_req, res) => {
    try {
      const [state, ocrUsage] = await Promise.all([
        loadContestStore({ forceCloud: true }),
        getOcrMonthlyUsage(),
      ]);
      res.json({
        ...state,
        gcsStatus: dataStore.gcsStatus(),
        ocrUsage,
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se načíst administraci soutěží.' });
    }
  });

  // Admin: seed 2 sample template contests (Inventory Combo + Stats Delta)
  router.post('/admin/seed-samples', requireContestAuth, async (_req, res) => {
    try {
      const created = await seedSampleContests();
      res.json({ success: true, createdCount: created.length, created });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se vytvořit testovací soutěže.' });
    }
  });

  // Admin: update hub settings
  router.put('/admin/settings', requireContestAuth, async (req, res) => {
    try {
      const settings = await updateContestHubSettings(req.body || {});
      res.json({ success: true, settings });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Nepodařilo se uložit nastavení.' });
    }
  });

  // Admin: create contest
  router.post('/admin/contests', requireContestAuth, async (req, res) => {
    try {
      const { contest } = await upsertContest(req.body || {});
      res.status(201).json({ success: true, contest });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Nepodařilo se vytvořit soutěž.' });
    }
  });

  // Admin: update contest
  router.put('/admin/contests/:id', requireContestAuth, async (req, res) => {
    try {
      const { contest } = await upsertContest(req.body || {}, req.params.id);
      res.json({ success: true, contest });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Nepodařilo se upravit soutěž.' });
    }
  });

  // Admin: delete contest
  router.delete('/admin/contests/:id', requireContestAuth, async (req, res) => {
    try {
      const deleted = await deleteContest(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Soutěž nebyla nalezena.' });
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se smazat soutěž.' });
    }
  });

  // Admin: manually add participant entry
  router.post('/admin/contests/:id/entries', requireContestAuth, async (req, res) => {
    try {
      const entry = await addContestEntry(req.params.id, req.body || {}, {
        addedByAdmin: true,
      });
      res.status(201).json({ success: true, entry });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Nepodařilo se přidat účastníka.' });
    }
  });

  // Admin: manually override entry verification status (approve / pending_review / rejected)
  router.patch('/admin/contests/:id/entries/:entryId', requireContestAuth, async (req, res) => {
    try {
      const { status, statusReason } = req.body || {};
      const updated = await updateContestEntryStatus(
        req.params.id,
        req.params.entryId,
        status,
        statusReason
      );
      if (!updated) {
        return res.status(404).json({ error: 'Přihláška nebyla nalezena.' });
      }
      res.json({ success: true, entry: updated });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Nepodařilo se aktualizovat stav přihlášky.' });
    }
  });

  // Admin: remove participant entry
  router.delete('/admin/contests/:id/entries/:entryId', requireContestAuth, async (req, res) => {
    try {
      const deleted = await deleteContestEntry(req.params.id, req.params.entryId);
      if (!deleted) {
        return res.status(404).json({ error: 'Přihláška nebyla nalezena.' });
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Nepodařilo se odstranit přihlášku.' });
    }
  });

  // Admin: cryptographically fair random draw of winners (only from approved entries!)
  router.post('/admin/contests/:id/draw', requireContestAuth, async (req, res) => {
    try {
      const { count, excludeExistingWinners, saveToWinners } = req.body || {};
      const result = await drawContestWinners(req.params.id, {
        count: Number(count) || 1,
        excludeExistingWinners: excludeExistingWinners !== false,
        saveToWinners: Boolean(saveToWinners),
      });
      res.json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      res.status(400).json({ error: err?.message || 'Losování se nezdařilo.' });
    }
  });

  return router;
}
