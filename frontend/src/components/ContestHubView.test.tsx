// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import { ContestHubView } from './ContestHubView';
import { ContestAdminView } from './ContestAdminView';
import * as config from '../config';

vi.mock('qrcode', () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,abc'),
    toString: vi.fn().mockResolvedValue('<svg></svg>'),
  },
}));

describe('Local Community Contests (/cs/soutez & /cs/soutez/admin)', () => {
  beforeEach(() => {
    cleanup();
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders both template contests (Inventory Combo + Stats Delta) without any admin links or screenshot upload on Stats Delta', async () => {
    const now = new Date().toISOString();
    const later = new Date(Date.now() + 86400_000).toISOString();

    vi.spyOn(config, 'apiFetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        settings: {
          groupName: 'PoGo Lokální Skupina',
          hubTitle: 'Městské soutěže',
          hubSubtitle: 'Jen přes QR kód',
        },
        contests: [
          {
            id: 'c-inv',
            slug: 'inventarova-stafeta',
            title: 'Inventářová štafeta',
            description: 'Chyť 3 Pokémony v abecedním pořadí.',
            rules: ['Filtr age0'],
            prizes: ['500 PokéCoins'],
            status: 'active',
            contestType: 'inventory_combo',
            registrationEnabled: true,
            motif: { mode: 'pokemon', pokemonDexId: 133, pokemonName: 'Eevee', shiny: true },
            inventoryComboConfig: {
              ruleMode: 'alphabetical',
              comboLength: 3,
              requireAge0: true,
            },
            winners: [],
            createdAt: now,
            updatedAt: now,
            entryCount: 2,
            qualifiedCount: 1,
          },
          {
            id: 'c-stats',
            slug: 'statistiky-trenera',
            title: 'Výzva statistik trenéra',
            description: 'Splň cílový rozdíl statistik.',
            rules: ['Stejné jméno'],
            prizes: ['Inkubátor'],
            status: 'active',
            contestType: 'stats_delta',
            registrationEnabled: true,
            motif: { mode: 'pokemon', pokemonDexId: 448, pokemonName: 'Lucario', shiny: false },
            statsDeltaConfig: {
              baselineDeadline: later,
              finalOpenAt: now,
              matchMode: 'min_count',
              minMetricsRequired: 2,
              metrics: [
                { id: 'distance_walked', label: 'Distance walked', unit: 'km', enabled: true, threshold: 3, allowDecimal: true },
                { id: 'pokemon_caught', label: 'Pokémon caught', unit: 'ks', enabled: true, threshold: 30 },
              ],
            },
            winners: [],
            createdAt: now,
            updatedAt: now,
            entryCount: 1,
            qualifiedCount: 1,
          },
        ],
      }),
    } as Response);

    const { container } = render(<ContestHubView />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Inventářová štafeta' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Výzva statistik trenéra' })).toBeInTheDocument();
    });

    // Open Stats Delta form and verify NO file upload input exists in Stats Delta
    fireEvent.click(screen.getByRole('button', { name: /Zadat statistiky/i }));
    await waitFor(() => {
      expect(screen.getByText('1. Startovní stav')).toBeInTheDocument();
      expect(screen.getByText('2. Finální stav')).toBeInTheDocument();
    });
    expect(container.querySelector('input[type="file"]')).toBeNull();

    // Public hub must NEVER expose links to /cs/soutez/admin
    expect(container.innerHTML).not.toContain('/soutez/admin');
  });

  it('requires both username and password on /cs/soutez/admin login screen', async () => {
    render(<ContestAdminView />);

    await waitFor(() => {
      expect(screen.getByLabelText('Uživatelské jméno')).toBeInTheDocument();
      expect(screen.getByLabelText('Heslo')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Přihlásit se/i })).toBeInTheDocument();
    });
  });
});
