import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import * as moment from "moment";

declare var $ : any;

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css'],
    host: {
        'class': 'field'
    }
})
export class DatePickerComponent implements AfterViewInit {
    @Input('name')
    public name?: string;

    @Input('type')
    public type: string = 'datetime';

    @Input('start')
    public start?: string;

    @Input('end')
    public end?: string;

    @Input('label')
    public label?: string;

    @Output('dateChanged')
    public dateChanged = new EventEmitter<moment.Moment>();

    @ViewChild('dateInput')
    public dateInputRef?: ElementRef<HTMLInputElement>;

    constructor() {

    }

    ngAfterViewInit(): void {
        const options = {
            type: this.type,
            endCalendar: null,
            startCalendar: null,
        };

        if(this.start) {
            options.startCalendar = $(`#${this.start}`);
        }

        if(this.end) {
            options.endCalendar = $(`${this.end}`);
        }

        $(`#${this.name}`).calendar(options);
    }

    setValue(target: EventTarget | null) {
        if(!target) {
            return;
        }
        
        const value = (<HTMLInputElement>target).value;
        
        this.dateChanged.emit(moment(value));
    }
}