import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { BookComponent } from 'src/components/book/book.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { HomeComponent } from 'src/components/home/home.component';
import { OktaAuthService } from 'src/services/okta-auth.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AvailabilityService } from 'src/services/availability.service';
import { AvailabilityComponent } from 'src/components/availability/availability.component';
import { AvailabilityDetailsComponent } from 'src/components/availability-details/availability-details.component';
import { DancesService } from 'src/services/dances.service';
import { CreateAvailabilityComponent } from 'src/components/create-availability/create-availability.component';
import { CommonModule } from '@angular/common';
import { DanceListComponent } from 'src/components/dance-list/dance-list.component';
import { DanceStatusComponent } from 'src/components/dance-status/dance-status.component';
import { DanceListFilterComponent } from 'src/components/dance-list-filter/dance-list-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    BookComponent,
    AvailabilityComponent,
    AvailabilityDetailsComponent,
    CreateAvailabilityComponent,
    DanceListComponent,
    DanceStatusComponent,
    DanceListFilterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    OktaAuthService,
    AvailabilityService,
    DancesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
