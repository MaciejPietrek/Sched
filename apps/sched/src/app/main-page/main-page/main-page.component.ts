import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MegaMenuItem } from 'primeng/api';
import { navigationItem } from '../../utils/navigation-items';
import { BtnCellRendererComponent } from './../../grid/btn-cell-renderer/btn-cell-renderer.component';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'sched-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private session: SessionService) {
    this.items = [
      navigationItem.user(this.session.getSession().username),
      navigationItem.sources,
      navigationItem.signOut,
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
