import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  ArrayOptions,
  ControlOptions,
  FormOptions,
  GroupOptions,
} from './form-options';

export class SchedGroup extends FormGroup {
  definition!: FormOptions;
}

export class SchedArray extends FormArray {
  definition!: FormOptions;
}

export class SchedControl extends FormControl {
  definition!: FormOptions;
}

export const parseFormControl = (
  fb: FormBuilder,
  controlDefinition: ControlOptions
) => {
  return fb.control(controlDefinition.defaultValue);
};

export const parseFormObject = (
  fb: FormBuilder,
  formDefinition: GroupOptions,
  group: FormGroup = fb.group({})
) => {
  const props = Object.entries(formDefinition.properties!);

  props.forEach(([field, definition]) =>
    group.addControl(field, parseFormOptions(fb, definition)!)
  );
  return group;
};

export const parseFormArray = (
  fb: FormBuilder,
  formDefinition: ArrayOptions,
  array: FormArray = fb.array([])
) => {
  const items = formDefinition.items!;
  //@ts-ignore
  array.scaffold = items;

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
      return parseFormControl(fb, formDefinition);
    case 'array':
      return parseFormArray(fb, formDefinition);
    case 'object':
      return parseFormObject(fb, formDefinition);
    default:
      throw new Error('Invalid form definition type');
  }
};
