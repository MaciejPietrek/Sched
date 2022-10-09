import { TestService } from './services/test/test.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sched-application-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private test: TestService) {}
  onActivate(component: any) {
    console.log('onActivate');
  }
  onDeactivate(component: any) {
    console.log('onDeactivate');
  }
  onDeattach(component: any) {
    console.log('onDeattach', component);
  }
  onAttach(component: any) {
    console.log('onAttach', component);
  }

  checkConnection() {
    this.test.checkConnection().subscribe();
  }
}
