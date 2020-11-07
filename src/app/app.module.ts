import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilsModule } from './modules/utils/utils.module';
import { AdminModule } from './modules/admin/admin.module';
import { ClienteModule } from './modules/cliente/cliente.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UtilsModule,
    AdminModule,
    ClienteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
