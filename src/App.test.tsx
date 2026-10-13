import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';

afterEach(() => vi.restoreAllMocks());

describe('community app', () => {
  it('supports search, filtering, and recovering from no results', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    await user.selectOptions(
      screen.getByLabelText('Opportunity type'),
      'Workshop',
    );
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.type(screen.getByRole('searchbox'), 'missing');
    expect(screen.getByText('No opportunities found.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Clear filters' }));
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });
  it('saves and unsaves events and internships across navigation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole('button', {
        name: 'Save A little dirt. A lot of good.',
      }),
    );
    expect(
      screen.getByRole('button', {
        name: 'Unsave A little dirt. A lot of good.',
      }),
    ).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: /Saved/ }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(
      screen.getByRole('button', {
        name: 'Unsave A little dirt. A lot of good.',
      }),
    );
    expect(screen.getByText('Keep something good for later.')).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Internships' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    await user.click(
      screen.getByRole('button', { name: 'Save Community outreach intern' }),
    );
    await user.click(screen.getByRole('button', { name: /Saved/ }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(screen.getByRole('link', { name: 'Com-un home' }));
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });
  it('opens and dismisses details and supports map popup selection', async () => {
    // jsdom has no layout; Leaflet needs element dimensions to translate clicks.
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 800,
      bottom: 400,
      width: 800,
      height: 400,
      toJSON: () => ({}),
    });
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(800);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(400);
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole('button', { name: 'A little dirt. A lot of good.' }),
    );
    expect(
      screen.getByRole('region', { name: 'Opportunity details' }),
    ).toHaveTextContent('sample listing');
    await user.click(screen.getByRole('button', { name: 'Close details' }));
    expect(
      screen.queryByRole('region', { name: 'Opportunity details' }),
    ).not.toBeInTheDocument();
    await user.click(
      within(screen.getAllByRole('article')[1]).getByRole('button', {
        name: 'View details',
      }),
    );
    expect(
      screen.getByRole('region', { name: 'Opportunity details' }),
    ).toHaveTextContent('Meet your neighbors');
    await user.click(screen.getByRole('button', { name: 'Map' }));
    expect(
      screen.queryByRole('region', { name: 'Opportunity details' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByLabelText('Map of sample opportunities in Atlanta'),
    ).toBeVisible();
    expect(screen.getAllByRole('article')).toHaveLength(6);
    // Real Leaflet markers, rather than a mock of the map component.
    const marker = document.querySelector('.leaflet-interactive');
    expect(marker).not.toBeNull();
    fireEvent.click(marker!, { clientX: 100, clientY: 100, detail: 1 });
    fireEvent.click(screen.getByRole('button', { name: 'View opportunity' }), {
      clientX: 100,
      clientY: 100,
      detail: 1,
    });
    expect(
      screen.getByRole('region', { name: 'Opportunity details' }),
    ).toHaveTextContent('A little dirt.');
  });
  it('keeps the current selection and reports failed persistence', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    const user = userEvent.setup();
    render(<App />);
    await user.click(
      screen.getByRole('button', {
        name: 'Save A little dirt. A lot of good.',
      }),
    );
    expect(screen.getByRole('alert')).toHaveTextContent('couldn’t save');
    await user.click(screen.getByRole('button', { name: /Saved/ }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
