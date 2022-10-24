export type PStorageType = 'local' | 'session' | 'runtime';

const _Serializators = {
  JSON: JSON.stringify,
  string: (input: string) => input,
  number: (input: number) => String(input),
  boolean: (input: boolean) => (input ? 'true' : 'false'),
};

const _Deserializators = {
  JSON: JSON.parse,
  string: (input: string) => input,
  number: (input: string) => Number(input),
  boolean: (input: string) => ({ true: true, false: false }[input] ?? null),
};

export class PStorage<T> {
  static Deserializators = _Deserializators;
  static Serializators = _Serializators;
  private static storage: any = {};
  constructor(
    type: PStorageType,
    key: string,
    serializator: (value: T) => string = PStorage.Serializators.JSON,
    deserializator: (value: string) => T | null = PStorage.Deserializators.JSON
  ) {
    switch (type) {
      case 'runtime':
        if (!(key in PStorage.storage)) PStorage.storage[key] = null;
        this.get = () => PStorage.storage[key];
        this.set = (value) => (PStorage.storage[key] = value);
        this.clear = () => (PStorage.storage[key] = null);
        break;
      case 'local':
        this.get = () => deserializator(localStorage.getItem(key) as any);
        this.set = (value) => localStorage.setItem(key, serializator(value));
        this.clear = () => localStorage.removeItem(key);
        break;
      case 'session':
        this.get = () => deserializator(sessionStorage.getItem(key) as any);
        this.set = (value) => sessionStorage.setItem(key, serializator(value));
        this.clear = () => sessionStorage.removeItem(key);
        break;
      default:
        throw new Error(`Unknown storage type (${type}).`);
    }
    PStorage.AllStorages.push(this);
  }

  get: () => T | null;
  set: (value: T) => void;
  pop: () => T | null = () => {
    const value = this.get();
    this.clear();
    return value;
  };
  has: () => boolean = () => {
    return this.get() != null;
  };
  clear: () => void;

  private static AllStorages: PStorage<any>[] = [];
  static clearAll() {
    PStorage.AllStorages.forEach((storage) => storage.clear());
  }
}
