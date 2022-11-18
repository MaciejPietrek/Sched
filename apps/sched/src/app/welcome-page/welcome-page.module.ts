import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
  },
];

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [CommonModule, MegaMenuModule, RouterModule.forChild(routes)],
  exports: [WelcomePageComponent],
})
export class WelcomePageModule {}
