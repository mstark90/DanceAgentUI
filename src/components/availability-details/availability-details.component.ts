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
            error(err) {

            },
            complete() {
                subscription.unsubscribe();
            }
        });
    }

    formatDate(date: Date): string {
        return moment(date).format("MM/DD/yyyy hh:mm a");
    }

    loadAvailabilityId(): void {
        const _this = this;

        const subscription = this.activatedRoute.params.subscribe({
            next(params: Params) {
                _this.loadAvailability(params['availabilityId']);
            },
            error(err) {

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

                },
                complete() {
                    subscription.unsubscribe();
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

                },
                complete() {
                    subscription.unsubscribe();
                }
            })
    }
}