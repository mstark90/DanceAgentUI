import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { DanceRequest } from "src/models/dance-request.model";
import { DancesService } from "src/services/dances.service";

import * as moment from 'moment';

declare var jQuery: any;

@Component({
    selector: 'app-dance-details',
    templateUrl: './dance-details.component.html',
    styleUrls: ['./dance-details.component.css']
})
export class DanceDetailsComponent implements OnInit {
    public dance: DanceRequest | null = null;

    public loading = false;

    public error = false;
    public errorMessage = '';

    public statusError = false;
    public statusErrorMessage = '';

    constructor(private danceService: DancesService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.loadDanceRequestId();
    }

    formatDate(date: Date | undefined): string {
        if(!date) {
            return '';
        }
        return moment(date).format("MM/DD/yyyy hh:mm a");
    }

    loadDanceRequestId(): void {
        const _this = this;

        this.loading = true;
        this.error = false;

        const subscription = this.activatedRoute.params.subscribe({
            next(params: Params) {
                _this.loadDance(params['danceRequestId']);
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

    loadDance(danceRequestId: number): void {
        const _this = this;

        const subscription = this.danceService
            .getForId(danceRequestId)
            .subscribe({
                next(dance: DanceRequest) {
                    _this.dance = dance;
                },
                error(error: HttpErrorResponse) {
                    _this.loading = false;
                    _this.error = true;
                    _this.errorMessage = error.error && error.error.message ? error.error.message : error.message;
                },
                complete() {
                    subscription.unsubscribe();
                    _this.loading = false;
                }
            });
    }
}