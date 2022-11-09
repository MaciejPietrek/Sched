import { ProgressElementModule } from './../progress-element/progress-element.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { GeneralLayoutModule } from './../components/general-layout/general-layout.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './sign-out-page/sign-out-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent,
    SignOutPageComponent,
  ],
  imports: [
    CommonModule,
    GeneralLayoutModule,
    ButtonModule,
    RippleModule,
    ProgressElementModule,
    InputTextModule,
    RouterModule,
  ],
  exports: [SignInPageComponent, SignUpPageComponent, SignOutPageComponent],
})
export class AuthPageModule {}
