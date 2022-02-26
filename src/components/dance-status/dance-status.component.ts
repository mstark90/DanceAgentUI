import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Params } from "@angular/router";
import { DanceRequest } from "src/models/dance-request.model";
import { DancesService } from "src/services/dances.service";

declare var jQuery: any;

@Component({
    selector: 'app-dance-status',
    templateUrl: './dance-status.component.html',
    styleUrls: ['./dance-status.component.css']
})
export class DanceStatusComponent implements AfterViewInit {
    @Input('dance')
    public dance?: DanceRequest;

    @Output('success')
    public success: EventEmitter<string>;

    @Output('error')
    public error: EventEmitter<string>;

    @ViewChild('status')
    public statusRef?: ElementRef<HTMLSelectElement>;

    constructor(private danceService: DancesService) {
        this.success = new EventEmitter<string>();
        this.error = new EventEmitter<string>();
    }

    ngAfterViewInit(): void {
        jQuery(this.statusRef?.nativeElement).dropdown();
    }

    updateStatus(target?: EventTarget | null) {
        if (!this.dance) {
            return;
        }
        let status = '';

        if (target) {
            status = (<HTMLInputElement>target).value;
        }

        this.dance.status = status;

        const _this = this;

        const subscription = this.danceService.update(this.dance.danceRequestId, this.dance)
            .subscribe({
                next(params: Params) {
                    _this.success.emit('');
                },
                error(error: HttpErrorResponse) {
                    _this.error.emit(error.error ? error.error.message : error.message);
                },
                complete() {
                    subscription.unsubscribe();
                }
            });
    }
}