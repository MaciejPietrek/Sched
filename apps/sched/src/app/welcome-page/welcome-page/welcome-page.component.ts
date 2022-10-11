import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { paths } from '../../utils/paths';

@Component({
  selector: 'sched-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router) {}

  items: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-sign-in',
      command: () => this.router.navigateByUrl(paths.signIn),
    },
  ];

  ngOnInit(): void {}
}
