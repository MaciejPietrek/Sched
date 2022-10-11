import { Component, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sched-application-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showShedDev = new BehaviorSubject<boolean>(false);

  @HostListener('window:keydown.alt.control.1', ['$event'])
  handleDevComponentTrigger() {
    this.showShedDev.next(!this.showShedDev.value);
    console.log(this.showShedDev.value);
  }
}
