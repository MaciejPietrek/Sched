import { ProgressElementModule } from './../progress-element/progress-element.module';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSourcePageComponent } from './view-source-page/view-source-page.component';
import { Route, RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { SourcePageComponent } from './source-page/source-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ViewSourcePageComponent,
  },
  {
    path: ':viewsourceName',
    component: SourcePageComponent,
  },
];

@NgModule({
  declarations: [ViewSourcePageComponent, SourcePageComponent],
  imports: [
    CommonModule,
    ButtonModule,
    AgGridModule,
    MenubarModule,
    MegaMenuModule,
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
  exports: [ViewSourcePageComponent],
})
export class ViewSourceModule {}
