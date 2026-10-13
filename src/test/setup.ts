import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Node 25 also exposes web storage; use the browser implementation in jsdom.
beforeEach(() => {
  vi.stubGlobal('localStorage', window.localStorage);
  vi.stubGlobal('Storage', window.Storage);
  localStorage.clear();
});
afterEach(() => cleanup());
