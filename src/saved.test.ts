import { describe, expect, it, vi, afterEach } from 'vitest';
import { readSaved, writeSaved } from './saved';

afterEach(() => vi.restoreAllMocks());

describe('browser saves', () => {
  it('round-trips IDs and starts empty', () => {
    expect(readSaved()).toEqual([]);
    expect(writeSaved(['garden'])).toBe(true);
    expect(readSaved()).toEqual(['garden']);
  });
  it('recovers from malformed or unexpected stored values', () => {
    localStorage.setItem('com-un:saved:v1', 'bad JSON');
    expect(readSaved()).toEqual([]);
    localStorage.setItem('com-un:saved:v1', '{}');
    expect(readSaved()).toEqual([]);
    localStorage.setItem('com-un:saved:v1', '["garden", 1, null]');
    expect(readSaved()).toEqual(['garden']);
  });
  it('handles storage disabled by the browser', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Blocked');
    });
    expect(readSaved()).toEqual([]);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Quota');
    });
    expect(writeSaved(['garden'])).toBe(false);
  });
});
