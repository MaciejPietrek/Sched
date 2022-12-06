import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Route[] = [
  {
    path: '',
    component: ErrorPageComponent,
  },
];

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, ButtonModule, RouterModule.forChild(routes)],
})
export class ErrorPageModule {}
