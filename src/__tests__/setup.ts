// __mocks__/vitest-env.d.ts
/// <reference types="vite/client" />
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});
