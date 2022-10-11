import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';
import { SignUpPageComponent } from './auth-page/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './auth-page/sign-in-page/sign-in-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignOutPageComponent } from './auth-page/sign-out-page/sign-out-page.component';
import { AnonimGuard } from './guards/anonim.guard';
import { SimpleGuard } from './guards/simple.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
    canActivate: [SimpleGuard],
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
