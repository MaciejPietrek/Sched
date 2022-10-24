import { PStorage } from '../../utils/storage';
import { JwtSession } from './session.interface';

export const sessionS = new PStorage<JwtSession>('session', 'session-storage');
export const jwtS = new PStorage<string>(
  'session',
  'jwt-storage',
  PStorage.Serializators.string,
  PStorage.Deserializators.string
);
export const sessionInitialitedS = new PStorage<boolean>(
  'session',
  'session-data-storage',
  PStorage.Serializators.boolean,
  PStorage.Deserializators.boolean
);
