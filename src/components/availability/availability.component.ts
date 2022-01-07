import { Component } from '@angular/core';
import { Availability } from 'src/models/availability.model';
import { AvailabilityService } from 'src/services/availability.service';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent {
    public availabilityList: Availability[] = [];
    public loading = false;
    public error = false;
    public errorMessage = '';
    constructor(private availabilityService: AvailabilityService) {
        
    }

    formatDate(date: Date): string {
        return moment(date).format("MM/DD/yyyy hh:mm a");
    }

    getAvailabilityUrl(availability: Availability) {
        return `/availability/${availability.availabilityId}`;
    }

    ngOnInit(): void {
        this.loading = true;

        const subscription = this.availabilityService.getForUser()
            .subscribe((availabilityList: Availability[]) => {
                this.availabilityList = availabilityList;
            }, (error: HttpErrorResponse) => {
                this.error = true;
                this.errorMessage = error.message;
                this.loading = false;
            }, () => {
                subscription.unsubscribe();
                this.loading = false;
            })
    }
}