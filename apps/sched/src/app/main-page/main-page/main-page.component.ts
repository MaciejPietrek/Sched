import { BtnCellRendererComponent } from './../../grid/btn-cell-renderer/btn-cell-renderer.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { paths } from '../../utils/paths';
import {
  CellClickedEvent,
  ColDef,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';

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
