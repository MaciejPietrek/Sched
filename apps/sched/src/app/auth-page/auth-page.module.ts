import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeneralLayoutModule } from './../components/general-layout/general-layout.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './sign-out-page/sign-out-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    SignOutPageComponent,
  ],
  imports: [CommonModule, GeneralLayoutModule],
  exports: [SignInPageComponent, SignUpPageComponent, SignOutPageComponent],
})
export class AuthPageModule {}
