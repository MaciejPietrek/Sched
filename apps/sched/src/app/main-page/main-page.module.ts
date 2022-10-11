import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { Routes, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
];

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, MenubarModule, RouterModule.forChild(routes)],
  exports: [MainPageComponent],
  bootstrap: [MainPageComponent],
})
export class MainPageModule {}
