import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
  },
];

@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [UserPageComponent],
  bootstrap: [UserPageComponent],
})
export class UserPageModule {}
