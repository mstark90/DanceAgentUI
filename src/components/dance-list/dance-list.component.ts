import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Availability } from 'src/models/availability.model';
import { AvailabilityService } from 'src/services/availability.service';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { DancesService } from 'src/services/dances.service';
import { DanceRequest } from 'src/models/dance-request.model';
import { Observable, Observer, Subscription } from 'rxjs';

declare var jQuery: any;

@Component({
    selector: 'app-dance-list',
    templateUrl: './dance-list.component.html',
    styleUrls: ['./dance-list.component.css']
})
export class DanceListComponent implements OnInit, AfterViewInit {
    public danceList: DanceRequest[] = [];
    public loading = false;
    public error = false;
    public errorMessage = '';

    public firstNameFilter: string = '';

    public lastNameFilter: string = '';

    public locationFilter: string = '';

    public statusFilter: string = '';

    constructor(private danceService: DancesService) {
    }

    ngAfterViewInit(): void {
        jQuery('#statusFilter').dropdown();
    }

    ngOnInit(): void {
        this.loadAll();
    }

    getDetailsUrl(dance: DanceRequest) {
        return `/dances/${dance.danceRequestId}`;
    }

    hasValue(element: HTMLInputElement | null): boolean {
        return !!element && !!element.value;
    }

    updateQuery(query: string, fieldName: string) {
        const element: HTMLInputElement | null = document.querySelector(`#${fieldName}Filter`);

        if (this.hasValue(element)) {
            if (query !== '') {
                query = query + ',';
            }

            query = query + fieldName + ':' + element?.value;
        }

        return query;
    }

    runQuery() {
        let query = '';

        query = this.updateQuery(query, 'firstName');

        query = this.updateQuery(query, 'lastName');

        query = this.updateQuery(query, 'status');

        if (query === '') {
            this.loadAll();

            return;
        }

        this.loadDances(this.danceService.search(query));
    }

    loadDances(subscriber: Observable<DanceRequest[]>): void {
        this.loading = true;
        this.danceList = [];

        let subscription: Subscription | null = null;
        const _this = this;

        const observer = {
            next(danceList: DanceRequest[]) {
                _this.danceList = danceList;
            },
            error(error: HttpErrorResponse) {
                _this.notifyError(error.message);
                _this.loading = false;
            },
            complete() {
                if (subscription) {
                    subscription.unsubscribe();
                }

                _this.loading = false;
            }
        };

        subscription = subscriber.subscribe(observer);
    }

    loadAll(): void {
        this.loadDances(this.danceService.getForCurrentUser());
    }

    formatDate(date: Date): string {
        return moment(date).format("MM/DD/yyyy hh:mm a");
    }

    getAvailabilityUrl(availability: Availability) {
        return `/availability/${availability.availabilityId}`;
    }

    notifyError(errorMessage: string) {
        this.error = true;
        this.errorMessage = errorMessage;
    }

    notifySuccess(message: string) {
        this.error = false;
        this.errorMessage = '';
    }
}