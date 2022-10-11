import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'sched-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.scss'],
})
export class BtnCellRendererComponent implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }
  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
    this.value = params.value;
  }

  btnClickedHandler() {
    this.params?.clicked?.(this.params);
  }
  private params: any;
  public value: string = '';
}
