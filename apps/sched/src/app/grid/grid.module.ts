import { AgGridModule } from 'ag-grid-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';

@NgModule({
  declarations: [BtnCellRendererComponent],
  imports: [CommonModule, AgGridModule],
  exports: [AgGridModule, BtnCellRendererComponent],
})
export class GridModule {}
