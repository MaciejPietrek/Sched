import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './auth-page/sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './auth-page/sign-out-page/sign-out-page.component';
import { SignUpPageComponent } from './auth-page/sign-up-page/sign-up-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AnonimGuard } from './guards/anonim.guard';
import { ErrorPageGuard } from './guards/error-page.guard';
import { SignInGuard } from './guards/sign-in.guard';
import { SimpleGuard } from './guards/simple.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
    canActivate: [SignInGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user-page/user-page.module').then((m) => m.UserPageModule),
    canActivate: [SignInGuard],
  },
  {
    path: 'sources',
    loadChildren: () =>
      import('./view-source/view-source.module').then(
        (m) => m.ViewSourceModule
      ),
    canActivate: [SignInGuard, AdminGuard],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error-page/error-page.module').then((m) => m.ErrorPageModule),
    canActivate: [ErrorPageGuard],
  },
  {
    path: 'signIn',
    component: SignInPageComponent,
    canActivate: [AnonimGuard],
  },
  {
    path: 'signUp',
    component: SignUpPageComponent,
    canActivate: [AnonimGuard],
  },
  {
    path: 'signOut',
    component: SignOutPageComponent,
    canActivate: [SimpleGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome-page/welcome-page.module').then(
        (m) => m.WelcomePageModule
      ),
    canActivate: [AnonimGuard],
  },
  {
    path: '**',
    redirectTo: 'main',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
