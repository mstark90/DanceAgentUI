import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Availability } from 'src/models/availability.model';
import { DanceRequest } from 'src/models/dance-request.model';
import { AvailabilityService } from 'src/services/availability.service';
import { DancesService } from 'src/services/dances.service';

@Component({
  selector: 'app-booking',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
    public availabilityList: Availability[] = [];
    public selectedAvailability?: Availability;

    public success = false;
    public error = false;
    public errorMessage = '';

    @ViewChild('name')
    public nameRef?: ElementRef<HTMLInputElement>;

    constructor(private availabilityService: AvailabilityService,
        private danceService: DancesService) {
    }

    setAvailability(event: Event) {
        const availabilityId = Number.parseInt((<HTMLSelectElement>event.target).value);
        if(availabilityId) {
            this.selectedAvailability = this.availabilityList
                .find((_current) => _current.availabilityId === availabilityId);
        } else {
            this.selectedAvailability = undefined;
        }
    }

    ngOnInit(): void {
        const _this = this;

        const subscription = this.availabilityService.getCurrent()
            .subscribe({next (availabilityList: Availability[]) {
                _this.availabilityList = _this.availabilityList.concat(availabilityList);
            },
            error(error: HttpErrorResponse) {
                _this.error = true;
                _this.errorMessage = error.error.message;
            }, complete() {
                subscription.unsubscribe();
            }
        });
    }

    bookDance(): void {
        if(!this.selectedAvailability || !this.nameRef) {
            this.error = true;

            this.errorMessage = 'The form has not been completely filled out.';

            return;
        }

        this.error = false;
        this.errorMessage = '';
        this.success = false;

        const availabilityId = this.selectedAvailability?.availabilityId || 0;
        const request = {
            name: this.nameRef?.nativeElement.value || '',
        };
        const _this = this;

        const subscription = this.danceService.book(availabilityId, request)
            .subscribe({
                next(dance: DanceRequest) {
                    _this.success = true;
                },
                error(error: HttpErrorResponse) {
                    _this.error = true;
                    _this.errorMessage = error.error.message;
                },
                complete() {
                    subscription.unsubscribe();
                }
            });
    }
}