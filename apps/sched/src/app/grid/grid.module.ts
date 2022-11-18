import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';

@NgModule({
  declarations: [BtnCellRendererComponent],
  imports: [CommonModule, AgGridModule],
  exports: [AgGridModule, BtnCellRendererComponent],
})
export class GridModule {}
