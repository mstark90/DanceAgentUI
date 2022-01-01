import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AvailabilityComponent } from 'src/components/availability/availability.component';
import { CallbackComponent } from 'src/components/callback/callback.component';
import { AvailabilityDetailsComponent } from 'src/components/availability-details/availability-details.component';
import { HomeComponent } from 'src/components/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'availability',
        component: AvailabilityComponent,
    },
    {
        path: 'availability/:availabilityId',
        component: AvailabilityDetailsComponent,
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