import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { SessionService } from '../../services/session/session.service';
import { paths } from '../../utils/paths';

@Component({
  selector: 'sched-view-source-page',
  templateUrl: './view-source-page.component.html',
  styleUrls: ['./view-source-page.component.scss'],
})
export class ViewSourcePageComponent implements OnInit {
  items: MegaMenuItem[] = [];
  rowData = [];
  pageGridDefinition = {};
  constructor(private session: SessionService) {
    this.items = [
      {
        icon: 'pi pi-fw pi-user',
        label: this.session.getSession().username,
        routerLink: `/${paths.userPage}`,
      },
      {
        icon: 'pi pi-fw pi-sign-out',
        routerLink: `/${paths.signOut}`,
      },
    ];
  }

  ngOnInit(): void {}
}
