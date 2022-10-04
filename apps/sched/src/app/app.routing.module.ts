import { SignUpPageComponent } from './auth-page/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './auth-page/sign-in-page/sign-in-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignOutPageComponent } from './auth-page/sign-out-page/sign-out-page.component';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./main-page-module/main-page-module.module').then(
        (m) => m.MainPageModuleModule
      ),
  },
  {
    path: 'signIn',
    component: SignInPageComponent,
  },
  {
    path: 'signUp',
    component: SignUpPageComponent,
  },
  {
    path: 'signOut',
    component: SignOutPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
