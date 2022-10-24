import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSourcePageComponent } from './view-source-page/view-source-page.component';
import { Route, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';

const routes: Route[] = [
  {
    path: '',
    component: ViewSourcePageComponent,
  },
];

@NgModule({
  declarations: [ViewSourcePageComponent],
  imports: [
    CommonModule,
    MenubarModule,
    MegaMenuModule,
    BreadcrumbModule,
    AgGridModule,
    RouterModule.forChild(routes),
  ],
  exports: [ViewSourcePageComponent],
})
export class ViewSourceModule {}
