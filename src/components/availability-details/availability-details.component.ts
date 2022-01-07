import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Availability } from 'src/models/availability.model';
import { DanceRequest } from 'src/models/dance-request.model';
import { AvailabilityService } from 'src/services/availability.service';
import { DancesService } from 'src/services/dances.service';

import * as moment from 'moment';

declare var $: any;

@Component({
    selector: 'app-availability-details',
    templateUrl: './availability-details.component.html',
    styleUrls: ['./availability-details.component.css']
})
export class AvailabilityDetailsComponent {
    public danceList: DanceRequest[] = [];
    public availability?: Availability;

    public loading = false;
    public error = false;
    public errorMessage = '';

    constructor(private availabilityService: AvailabilityService,
        private activatedRoute: ActivatedRoute,
        private danceService: DancesService) {

    }

    ngOnInit(): void {
        this.loadAvailabilityId();
    }

    updateStatus(dance: DanceRequest, statusSource: EventTarget | null) {
        if(!statusSource || !this.availability) {
            return;
        }

        const status = (<HTMLSelectElement>statusSource).value;

        dance.status = status;

        const _this = this;

        const subscription = this.danceService.update(this.availability.availabilityId, dance).subscribe({
            next(params: Params) {
                
            },
            error(error: HttpErrorResponse) {
                _this.error = true;
                _this.errorMessage = error.error ? error.error.message : error.message;
            },
            complete() {
                subscription.unsubscribe();
            }
        });
    }

    formatDate(date: Date | undefined): string {
        if(!date) {
            return '';
        }
        
        return moment(date).format("MM/DD/yyyy hh:mm a");
    }

    getStatusCount(status: string) {
        return this.danceList.filter(dance => dance.status === status).length;
    }

    loadAvailabilityId(): void {
        const _this = this;

        this.loading = true;
        this.error = false;

        const subscription = this.activatedRoute.params.subscribe({
            next(params: Params) {
                _this.loadAvailability(params['availabilityId']);
            },
            error(error: HttpErrorResponse) {
                _this.error = true;
                _this.errorMessage = error.error ? error.error.message : error.message;
            },
            complete() {
                subscription.unsubscribe();
            }
        });
    }

    loadAvailability(availabilityId: number): void {
        const _this = this;

        const subscription = this.availabilityService
            .get(availabilityId)
            .subscribe({
                next(availability: Availability) {
                    _this.availability = availability;

                    _this.loadDances();
                },
                error(error: HttpErrorResponse) {
                    _this.loading = false;
                    _this.error = true;
                    _this.errorMessage = error.error ? error.error.message : error.message;
                },
                complete() {
                    subscription.unsubscribe();
                    _this.loading = false;
                }
            });
    }

    loadDances(): void {
        if (!this.availability) {
            return;
        }

        const _this = this;

        const subscription = this.danceService.getForAvailabilityId(this.availability.availabilityId)
            .subscribe({
                next(danceList: DanceRequest[]) {
                    _this.danceList = danceList;
                },
                error(error: HttpErrorResponse) {
                    _this.error = true;
                    _this.errorMessage =  error.error ? error.error.message : error.message;
                },
                complete() {
                    subscription.unsubscribe();
                }
            })
    }
}