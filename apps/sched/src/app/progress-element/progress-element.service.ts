import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  merge,
  Observable,
  Subject,
} from 'rxjs';

@Injectable()
export class ProgressElementService {
  constructor() {
    const _turnedOn = new Subject<void>();
    const _turnedOff = new Subject<void>();

    let currentValue = false;

    this.turnedOn = _turnedOn.asObservable();
    this.turnedOff = _turnedOff.asObservable().pipe(debounceTime(1000));
    this.toggled = merge(
      this.turnedOn.pipe(map(() => true)),
      this.turnedOff.pipe(map(() => false))
    );

    this.toggle = () => {
      currentValue = !currentValue;

      if (currentValue) _turnedOn.next();
      else _turnedOff.next();
    };

    this.turnOn = () => {
      _turnedOn.next();
    };

    this.turnOff = () => {
      _turnedOff.next();
    };
  }

  public toggle: () => void;
  public turnOn: () => void;
  public turnOff: () => void;

  public toggled = new Observable<boolean>();
  public turnedOn = new Observable<void>();
  public turnedOff = new Observable<void>();
}
