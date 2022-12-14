import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevModule } from './dev/dev.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthPageModule } from './auth-page/auth-page.module';
import { GeneralLayoutModule } from './components/general-layout/general-layout.module';
import { ProgressElementModule } from './progress-element/progress-element.module';
import { JwtInterceptorService } from './services/jwt-interceptor/jwt-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ProgressElementModule,
    AppRoutingModule,
    AuthPageModule,
    GeneralLayoutModule,
    ButtonModule,
    DevModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS as any,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
