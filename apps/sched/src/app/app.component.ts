import { paths } from './utils/paths';
import { TestService } from './services/test/test.service';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'sched-application-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  items: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-home',
      routerLink: paths.main,
    },
    {
      icon: 'pi pi-fw pi-power-off',
      routerLink: paths.signOut,
    },
  ];
}
