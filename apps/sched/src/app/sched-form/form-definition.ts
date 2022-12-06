import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ArrayOptions,
  ControlOptions,
  DefaultValue,
  FormOptions,
  GroupOptions,
} from './form-options';

export interface SchedGroup extends FormGroup {
  definition: GroupOptions;
}

export interface SchedArray extends FormArray {
  definition: ArrayOptions;
}

export interface SchedControl extends FormControl {
  definition: ControlOptions;
}

type AbstractSched = SchedArray | SchedControl | SchedGroup;

const evalDefaultValues = (defaults: DefaultValue) => {
  switch (defaults.type) {
    case 'eval':
      switch (defaults.value) {
        case 'Date.now': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return today;
        }
        case 'Datetime.now': {
          const today = new Date();
          return today;
        }
        case 'Date.tomorrow': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          today.setDate(today.getDate() + 1);
          return today;
        }
        case 'Datetime.tomorrow': {
          const today = new Date();
          today.setDate(today.getDate() + 1);
          return today;
        }
        case 'Date.yesterday': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          today.setDate(today.getDate() - 1);
          return today;
        }
        case 'Datetime.yesterday': {
          const today = new Date();
          today.setDate(today.getDate() - 1);
          return today;
        }
        case 'Date.now.string': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return today.toLocaleDateString();
        }
        case 'Datetime.now.string': {
          const today = new Date();
          return today.toLocaleString();
        }
        case 'Date.tomorrow.string': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          today.setDate(today.getDate() + 1);
          return today.toLocaleDateString();
        }
        case 'Datetime.tomorrow.string': {
          const today = new Date();
          today.setDate(today.getDate() + 1);
          return today.toLocaleString();
        }
        case 'Date.yesterday.string': {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          today.setDate(today.getDate() - 1);
          return today.toLocaleDateString();
        }
        case 'Datetime.yesterday.string': {
          const today = new Date();
          today.setDate(today.getDate() - 1);
          return today.toLocaleString();
        }

        default:
          break;
      }
      break;

    case 'object':
    case 'simple': {
      return defaults.value;
    }

    default:
      break;
  }

  return null;
};

export const parseFormControl = (
  fb: FormBuilder,
  controlDefinition: ControlOptions
) => {
  const control = fb.control(controlDefinition.defaultValue) as SchedControl;
  control.definition = controlDefinition;
  if ('defaultValue' in controlDefinition)
    control.setValue(evalDefaultValues(controlDefinition.defaultValue));
  if ('disabled' in controlDefinition)
    if (controlDefinition.disabled) control.disable();
    else control.enable();
  return control;
};

export const parseFormObject = (
  fb: FormBuilder,
  formDefinition: GroupOptions
) => {
  const group = fb.group({}) as SchedGroup;
  group.definition = formDefinition;

  const props = Object.entries(formDefinition.properties!);

  props.forEach(([field, definition]) =>
    group.addControl(field, parseFormOptions(fb, definition)!)
  );
  return group;
};

export const parseFormArray = (
  fb: FormBuilder,
  formDefinition: ArrayOptions
) => {
  const array = fb.array([]) as SchedArray;
  array.definition = formDefinition;

  const items = formDefinition.items!;

  array.setControl(array.length, parseFormOptions(fb, items)!);

  return array;
};

export const parseFormOptions = (
  fb: FormBuilder,
  formDefinition: FormOptions
) => {
  switch (formDefinition.type) {
    case 'number':
    case 'string':
    case 'boolean':
      return parseFormControl(fb, formDefinition);
    case 'array':
      return parseFormArray(fb, formDefinition);
    case 'object':
      return parseFormObject(fb, formDefinition);
    default:
      throw new Error('Invalid form definition type');
  }
};

export const findAllControls = (control: AbstractSched): AbstractSched[] => {
  switch (control.definition.type) {
    case 'number':
    case 'string':
    case 'boolean':
      return [control];
    case 'array':
      return [control, ...findAllControlInArray(control as any)];
    case 'object':
      return [control, ...findAllControlInGroup(control as any)];
    default:
      throw new Error('Invalid form definition type');
  }
};

export const findAllFormArrays = (control: AbstractSched): SchedArray[] =>
  findAllControls(control).filter(
    (control) => control instanceof FormArray
  ) as any;

export const findAllFormControls = (control: AbstractSched): SchedControl[] =>
  findAllControls(control).filter(
    (control) => control instanceof FormControl
  ) as any;

export const findAllFormGroups = (control: AbstractSched): SchedGroup[] =>
  findAllControls(control).filter(
    (control) => control instanceof FormGroup
  ) as any;

const findAllControlInArray = (control: SchedArray): AbstractSched[] => {
  return control.controls
    .map((c: any) => findAllControls(c))
    .reduce((all, curr) => [...all, ...curr]);
};

const findAllControlInGroup = (control: SchedGroup): AbstractSched[] => {
  return Object.values(control.controls)
    .map((c: any) => findAllControls(c))
    .reduce((all, curr) => [...all, ...curr]);
};

export const updateStructure = (
  fb: FormBuilder,
  control: AbstractSched,
  value: any
) => {
  switch (control.definition.type) {
    case 'number':
    case 'string':
    case 'boolean':
      return;
    case 'array':
      return updateFormArrayStructure(fb, control as any, value);
    case 'object':
      return updateFormGroupStructure(fb, control as any, value);
    default:
      throw new Error('Invalid form definition type');
  }
};

const updateFormArrayStructure = (
  fb: FormBuilder,
  control: SchedArray,
  value: any
) => {
  const controlLength = control.length;
  const valueLength = value.length;

  if (controlLength > valueLength)
    for (let index = controlLength; index > valueLength; index--)
      control.removeAt(index - 1);

  if (controlLength < valueLength)
    for (let index = controlLength; index < valueLength; index++)
      control.push(parseFormOptions(fb, control.definition.items));

  control.controls.forEach((control, index) =>
    updateStructure(fb, control as any, value[index])
  );
};

const updateFormGroupStructure = (
  fb: FormBuilder,
  control: SchedGroup,
  value: any
) => {
  Object.entries(control.controls).forEach(([key, control]) =>
    updateStructure(fb, control as any, value[key])
  );
};
