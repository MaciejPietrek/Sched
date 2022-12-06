import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import {
  parseFormObject,
  parseFormOptions,
  SchedArray,
  updateStructure,
} from './form-definition';
import { FormOptions, GroupOptions } from './form-options';

@Component({
  selector: 'sched-form',
  templateUrl: './sched-form.component.html',
  styleUrls: ['./sched-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.initFormOptionsSubsciption();
    this.initFormValueChangeSubsciption();
  }

  private inputValue$ = new Subject<{
    value: any;
    emitEvent: boolean;
    onlySelf: boolean;
  }>();
  private valueUpdate = this.inputValue$.pipe(
    tap((update) =>
      updateStructure(this.fb, this.formGroup.value as any, update.value)
    ),
    tap((update) => {
      this.formGroup.value.patchValue(update.value, {
        emitEvent: update.emitEvent,
        onlySelf: update.onlySelf,
      });
    })
  );

  @Input('value') set inputValue(value: Object) {
    this.inputValue$.next({ value, emitEvent: true, onlySelf: true });
  }
  @Output('valueChange') outputValue = new EventEmitter<Object>();

  public formOptions = new BehaviorSubject<FormOptions>(null as any);
  public formGroup = new BehaviorSubject<FormGroup>(null as any);

  public isInstanceOfFormGroup = (control: AbstractControl) => {
    return control instanceof FormGroup;
  };
  public isInstanceOfFormArray = (control: AbstractControl) => {
    return control instanceof FormArray;
  };
  public isInstanceOfFormControl = (control: AbstractControl) => {
    return control instanceof FormControl;
  };

  public udpateControlSize = (control: AbstractControl) => {};

  public onRemove = (control: FormControl, controlIndex: number) => {
    const formArray = control.parent! as SchedArray;
    formArray.removeAt(controlIndex);
  };

  public onCopy = (control: FormControl, controlIndex: number) => {
    const formArray = control.parent! as SchedArray;
    const newIndex = controlIndex + 1;

    const newControl = parseFormOptions(this.fb, formArray.definition?.items);
    formArray.insert(newIndex, newControl!);
    this.changeDetector.detectChanges();
  };

  public onNewElement = (control: SchedArray) => {
    const formArray = control;

    const newControl = parseFormOptions(this.fb, formArray.definition?.items);
    formArray.insert(0, newControl!);
    this.changeDetector.detectChanges();
  };

  private initFormOptionsSubsciption = () => {
    this.formOptions
      .pipe(
        map((formOptions) =>
          parseFormObject(this.fb, formOptions as GroupOptions)
        ),
        tap((formGroup) => this.formGroup.next(formGroup!))
      )
      .subscribe();
    this.valueUpdate.subscribe();
  };
  private initFormValueChangeSubsciption = () => {
    this.formGroup.value.valueChanges
      .pipe(tap(() => this.outputValue.next(this.formGroup.value.value)))
      .subscribe();
  };

  @Input('formOptions') set setValue(_formOptions: FormOptions) {
    this.formOptions.next(_formOptions);
  }
}
