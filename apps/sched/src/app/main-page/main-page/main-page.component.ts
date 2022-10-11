import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { paths } from '../../utils/paths';

@Component({
  selector: 'sched-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router) {}

  items: MenuItem[] = [
    {
      icon: 'pi pi-fw pi-sign-out',
      command: () => this.router.navigateByUrl(paths.signOut),
    },
  ];

  ngOnInit(): void {}
}
