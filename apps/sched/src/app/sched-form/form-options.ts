export interface GroupOptions {
  type: 'object';
  properties: Record<string, FormOptions>;
}
export interface ArrayOptions {
  type: 'array';
  items: FormOptions;
}
export interface ControlOptions {
  type: 'string' | 'number' | 'boolean';
  defaultValue: DefaultValue;
  disabled: boolean;
}

type EvalTypes =
  | 'Date.now'
  | 'Datetime.now'
  | 'Date.tomorrow'
  | 'Datetime.tomorrow'
  | 'Date.yesterday'
  | 'Datetime.yesterday'
  | 'Date.now.string'
  | 'Datetime.now.string'
  | 'Date.tomorrow.string'
  | 'Datetime.tomorrow.string'
  | 'Date.yesterday.string'
  | 'Datetime.yesterday.string';

export type DefaultValue =
  | {
      type: 'eval';
      value: EvalTypes;
    }
  | {
      type: 'object';
      value: object;
    }
  | {
      type: 'simple';
      value: string | number;
    };

export type FormOptions = GroupOptions | ArrayOptions | ControlOptions;
