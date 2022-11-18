import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './user-page.component';

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
