import { PStorage } from './storage';

export const signInGuardReturnURL = new PStorage<string>(
  'runtime',
  'returnURL'
);
