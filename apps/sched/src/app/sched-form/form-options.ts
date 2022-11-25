type ElementType = 'object' | 'string' | 'number' | 'array';

export interface GroupOptions {
  type: 'object';
  properties: Record<string, FormOptions>;
}
export interface ArrayOptions {
  type: 'array';
  items: FormOptions;
}
export interface ControlOptions {
  type: 'string' | 'number';
  defaultValue: string | number | null;
}

export type FormOptions = GroupOptions | ArrayOptions | ControlOptions;
