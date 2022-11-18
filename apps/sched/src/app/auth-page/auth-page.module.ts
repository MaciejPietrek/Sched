import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { GeneralLayoutModule } from './../components/general-layout/general-layout.module';
import { ProgressElementModule } from './../progress-element/progress-element.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './sign-out-page/sign-out-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

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
