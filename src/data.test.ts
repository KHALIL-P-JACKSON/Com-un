import { describe, expect, it } from 'vitest';
import { filterListings, listings } from './data';

describe('opportunity discovery', () => {
  it('separates internships from the community feed', () => {
    expect(filterListings(listings, 'Feed', '', 'All', [])).toHaveLength(4);
    expect(filterListings(listings, 'Internships', '', 'All', [])).toHaveLength(
      2,
    );
    expect(filterListings(listings, 'Map', '', 'All', [])).toHaveLength(6);
  });
  it('combines case-insensitive search, category, and saved filters', () => {
    expect(
      filterListings(listings, 'Feed', '  OAK  ', 'Volunteer', []),
    ).toEqual([listings[0]]);
    expect(filterListings(listings, 'Map', 'school', 'All', [])).toEqual([
      listings[3],
    ]);
    expect(filterListings(listings, 'Saved', '', 'All', ['garden'])).toEqual([
      listings[0],
    ]);
    expect(
      filterListings(listings, 'Saved', '', 'Workshop', ['garden']),
    ).toEqual([]);
    expect(filterListings(listings, 'Feed', 'no match', 'All', [])).toEqual([]);
    expect(filterListings(listings, 'Map', '', 'Internship', [])).toHaveLength(
      2,
    );
  });
  it('has unique IDs and valid geographic coordinates for every listing', () => {
    expect(new Set(listings.map((item) => item.id)).size).toBe(listings.length);
    for (const item of listings) {
      expect(item.coordinates[0]).toBeGreaterThanOrEqual(-90);
      expect(item.coordinates[0]).toBeLessThanOrEqual(90);
      expect(item.coordinates[1]).toBeGreaterThanOrEqual(-180);
      expect(item.coordinates[1]).toBeLessThanOrEqual(180);
    }
  });
});
