import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
];

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, MenubarModule, RouterModule.forChild(routes)],
  exports: [WelcomePageComponent],
})
export class WelcomePageModule {}
