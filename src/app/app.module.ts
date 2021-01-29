import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicDetailsFormComponent } from './basic-details-form/basic-details-form.component';
import { CardDetailsFormComponent } from './card-details-form/card-details-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicDetailsFormComponent,
    CardDetailsFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
