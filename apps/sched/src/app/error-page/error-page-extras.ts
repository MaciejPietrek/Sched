import { PStorage } from './../utils/storage';

export interface ErrorPageExtras {
  title: string;
  message: string;
}

export const errorPageExtras = new PStorage<ErrorPageExtras>(
  'runtime',
  'errorPageExtras',
  PStorage.Serializators.JSON,
  PStorage.Deserializators.JSON
);
