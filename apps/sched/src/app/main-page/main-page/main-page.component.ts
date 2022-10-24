import { SessionService } from './../../services/session/session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MegaMenuItem } from 'primeng/api';
import { paths } from '../../utils/paths';
import { BtnCellRendererComponent } from './../../grid/btn-cell-renderer/btn-cell-renderer.component';

@Component({
  selector: 'sched-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
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

  items: MegaMenuItem[] = [];

  pageGridCols: ColDef[] = [
    { field: 'change', headerName: 'Latest changes' },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: BtnCellRendererComponent,
    },
  ];
  pageGridDefinition: GridOptions = {
    columnDefs: this.pageGridCols,
  };
  rowData = [{ change: 'added login info', action: 'move' }];
  ngOnInit(): void {}
}
