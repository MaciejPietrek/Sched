import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'check',
    component: MainPageComponent,
  },
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MenubarModule,
    MegaMenuModule,
    BreadcrumbModule,
    AgGridModule,
    RouterModule.forChild(routes),
  ],
  exports: [MainPageComponent],
  bootstrap: [MainPageComponent],
})
export class MainPageModule {}
