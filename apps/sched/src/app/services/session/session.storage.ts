import { PStorage } from '../../utils/storage';
import { JwtSession } from './session.interface';

export const sessionS = new PStorage<JwtSession>('local', 'session-storage');
export const jwtS = new PStorage<string>(
  'local',
  'jwt-storage',
  PStorage.Serializators.string,
  PStorage.Deserializators.string
);
export const sessionInitialitedS = new PStorage<boolean>(
  'local',
  'session-data-storage',
  PStorage.Serializators.boolean,
  PStorage.Deserializators.boolean
);
