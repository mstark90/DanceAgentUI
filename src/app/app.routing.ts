import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AvailabilityComponent } from 'src/components/availability/availability.component';
import { CallbackComponent } from 'src/components/callback/callback.component';
import { AvailabilityDetailsComponent } from 'src/components/availability-details/availability-details.component';
import { HomeComponent } from 'src/components/home/home.component';
import { CreateAvailabilityComponent } from 'src/components/create-availability/create-availability.component';
import { OktaAuthGuard } from './app.guard';
import { DanceListComponent } from 'src/components/dance-list/dance-list.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'availability',
        component: AvailabilityComponent,
        canActivate: [OktaAuthGuard]
    },
    {
        path: 'dances',
        component: DanceListComponent,
        canActivate: [OktaAuthGuard]
    },
    {
        path: 'availability/create',
        component: CreateAvailabilityComponent,
        canActivate: [OktaAuthGuard]
    },
    {
        path: 'availability/:availabilityId',
        component: AvailabilityDetailsComponent,
        canActivate: [OktaAuthGuard]
    },
    {
        path: 'callback',
        component: CallbackComponent,
    }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }