import { expect, it } from 'vitest';
import init from '../src';

it('should starts the application', async () => {
  const app = await init();
  expect(app.isRunning).toBe(true);
});

