import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ProgressElementService {
  constructor() {
    const _turnedOn = new Subject<void>();
    const _turnedOff = new Subject<void>();
    const _toggled = new BehaviorSubject<boolean>(false);

    this.turnedOn = _turnedOn.asObservable();
    this.turnedOff = _turnedOff.asObservable();
    this.toggled = _toggled.asObservable();

    this.toggle = () => {
      const oldValue = _toggled.value;
      const newValue = !oldValue;

      if (newValue) _turnedOn.next();
      else _turnedOff.next();

      _toggled.next(newValue);
    };

    this.turnOn = () => {
      _toggled.next(true);
      _turnedOn.next();
    };

    this.turnOff = () => {
      _toggled.next(false);
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
