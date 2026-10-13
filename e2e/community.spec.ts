import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  // Tests must work without a live third-party tile service.
  await page.route('**/*.tile.openstreetmap.org/**', (route) => route.abort());
  await page.goto('/');
});

test('discover, save, refresh, and unsave an opportunity', async ({ page }) => {
  await expect(page.getByRole('article')).toHaveCount(4);
  await page.getByRole('searchbox').fill('garden');
  await expect(page.getByRole('article')).toHaveCount(1);
  await page
    .getByRole('button', { name: 'Save A little dirt. A lot of good.' })
    .click();
  await page.reload();
  await page.getByRole('button', { name: /Saved/ }).click();
  await expect(page.getByRole('article')).toHaveCount(1);
  await page
    .getByRole('button', { name: 'Unsave A little dirt. A lot of good.' })
    .click();
  await expect(page.getByText('Keep something good for later.')).toBeVisible();
});

test('internships, filters, map, and details are usable', async ({ page }) => {
  await page.getByRole('button', { name: 'Internships' }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
  await page
    .getByRole('button', { name: 'Community outreach intern', exact: true })
    .click();
  await expect(
    page.getByRole('region', { name: 'Opportunity details' }),
  ).toContainText('Sample paid');
  await page.getByRole('button', { name: 'Close details' }).click();
  await page.getByRole('button', { name: 'Map', exact: true }).click();
  await expect(page.locator('.leaflet-interactive')).toHaveCount(6);
  await page.locator('.leaflet-interactive').first().click();
  await page.getByRole('button', { name: 'View opportunity' }).click();
  await expect(
    page.getByRole('region', { name: 'Opportunity details' }),
  ).toContainText('A little dirt.');
  await page.getByLabel('Opportunity type').selectOption('Volunteer');
  await expect(page.getByRole('article')).toHaveCount(2);
  await expect(page.locator('.leaflet-interactive')).toHaveCount(2);
  await page.getByRole('searchbox').fill('not-a-real-opportunity');
  await expect(page.getByText('No opportunities found.')).toBeVisible();
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.getByRole('article')).toHaveCount(6);
});

test('all primary views meet automated accessibility and fit the viewport', async ({
  page,
}) => {
  for (const tab of ['Community feed', 'Internships', 'Map', 'Saved']) {
    await page.getByRole('button', { name: new RegExp(`^${tab}`) }).click();
    const result = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(result.violations).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
