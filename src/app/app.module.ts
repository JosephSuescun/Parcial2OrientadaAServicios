import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoaderComponent } from './public/loader/loader.component';
import { HeaderComponent } from './public/header/header.component';
import { FooterComponent } from './public/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    TooltipModule.forRoot(),
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS , useClass : AuthInterceptor , multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
