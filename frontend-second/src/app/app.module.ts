﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { EstablishmentModule } from './establishment/establishment.module';
import { LandingComponent } from './landing/landing.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import { HomeComponent } from './establishment/home';
import { HeaderComponent } from './shared/layout/main/header/header.component';
import { FooterComponent } from './shared/layout/main/footer/footer.component';

@NgModule({
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      JwtInterceptor,
      EstablishmentModule,
      SharedModule,
      BrowserAnimationsModule,
      MaterialModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LandingComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
