import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Availability } from "src/models/availability.model";
import { BookDanceRequest, DanceRequest } from "src/models/dance-request.model";
import { BaseService } from "./base.service";
import { OktaAuthService } from "./okta-auth.service";

@Injectable()
export class DancesService extends BaseService {
    constructor(http: HttpClient, oktaAuthService: OktaAuthService) {
            super(http, oktaAuthService);
    }

    getForAvailabilityId(availabilityId: number): Observable<DanceRequest[]> {
        const url = `${this.baseUrl}/availability/${availabilityId}/dances`;
        return this.http.get<DanceRequest[]>(url, this.getRequestOptions());
    }

    book(availabilityId: number, request: BookDanceRequest): Observable<DanceRequest> {
        const url = `${this.baseUrl}/availability/${availabilityId}/book`;
        return this.http.post<DanceRequest>(url, request, this.getRequestOptions());
    }

    update(availabilityId: number, request: DanceRequest): Observable<DanceRequest> {
        const url = `${this.baseUrl}/availability/${availabilityId}/dances`;
        return this.http.post<DanceRequest>(url, request, this.getRequestOptions());
    }
}
