import { Component } from '@angular/core';
import { errorPageExtras } from './../error-page-extras';

@Component({
  selector: 'sched-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  public title!: string;
  public message!: string;

  constructor() {
    const data = errorPageExtras.pop();
    this.title = data?.title!;
    this.message = data?.message!;
  }
}
