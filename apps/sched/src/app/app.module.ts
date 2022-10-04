import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressElementModule } from './progress-element/progress-element.module';
import { AppRoutingModule } from './app.routing.module';
import { AuthPageModule } from './auth-page/auth-page.module';
import { GeneralLayoutModule } from './components/general-layout/general-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProgressElementModule,
    AppRoutingModule,
    AuthPageModule,
    GeneralLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
