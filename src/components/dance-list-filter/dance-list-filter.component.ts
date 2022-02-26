import { Component, EventEmitter, Output } from '@angular/core';
import { Availability } from 'src/models/availability.model';
import { AvailabilityService } from 'src/services/availability.service';

import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { DancesService } from 'src/services/dances.service';
import { DanceRequest } from 'src/models/dance-request.model';
@Component({
  selector: 'app-dance-list-filter',
  templateUrl: './dance-list-filter.component.html',
  styleUrls: ['./dance-list-filter.component.css']
})
export class DanceListFilterComponent {
    
    @Output('queryChanged')
    public queryChanged = new EventEmitter<string>();

    constructor() {
        
    }

}