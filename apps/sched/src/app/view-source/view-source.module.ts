import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SchedFormModule } from '../sched-form/sched-form.module';
import { ProgressElementModule } from './../progress-element/progress-element.module';
import { SourcePageComponent } from './source-page/source-page.component';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'datasource',
  },
  {
    path: ':viewsourceName',
    component: SourcePageComponent,
  },
];

@NgModule({
  declarations: [SourcePageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    AgGridModule,
    MenubarModule,
    TieredMenuModule,
    MenuModule,
    MegaMenuModule,
    SchedFormModule,
    BreadcrumbModule,
    MonacoEditorModule,
    ReactiveFormsModule,
    ProgressElementModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.31.1/min/vs',
    },
  ],
  exports: [],
})
export class ViewSourceModule {}
