import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Availability, AvailabilityRequest } from 'src/models/availability.model';
import { AvailabilityService } from 'src/services/availability.service';

import * as moment from 'moment';

declare var $: any;

const BLANK_REQUEST = {
    availabilityId: -1,
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    danceLimit: -1
};

@Component({
    selector: 'app-create-availability',
    templateUrl: './create-availability.component.html',
    styleUrls: ['./create-availability.component.css']
})
export class CreateAvailabilityComponent {
    public availability?: Availability;
    public request: AvailabilityRequest = BLANK_REQUEST;
    public success = false;
    public error = false;
    public errorMessage?: string;
    public loading = false;

    @ViewChild('availabilityForm')
    public availabilityFormRef?: ElementRef<HTMLFormElement>;

    constructor(private availabilityService: AvailabilityService) {

    }

    ngOnInit(): void {
        const jqStartTime = $('#startTime');
        const jqEndTime = $('#endTime');
        jqStartTime.calendar({
            type: 'datetime',
            endCalendar: jqEndTime
        });

        jqEndTime.calendar({
            type: 'datetime',
            startCalendar: jqStartTime
        });
    }

    setValue(name: string, target: EventTarget | null, isDate: boolean = false) {
        if(!target) {
            return;
        }
        
        const _request: any = this.request;
        let value = (<HTMLInputElement>target).value;
        if(isDate) {
            value = moment(value).toISOString();
        }

        _request[name] = value;
    }

    create(): void {
        const _this = this;

        this.loading = true;
        this.success = false;
        this.error = false;

        const subscription = this.availabilityService.create(this.request)
            .subscribe({
                next(availability: Availability) {
                    _this.success = true;
                },
                error(err: HttpErrorResponse) {
                    _this.error = true;
                    _this.errorMessage = err.error.message;
                },
                complete() {
                    subscription.unsubscribe();
                    _this.loading = false;
                    _this.request = BLANK_REQUEST;
                }
            })
    }
}