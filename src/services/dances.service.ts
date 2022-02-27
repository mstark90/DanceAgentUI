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

    getForCurrentUser(): Observable<DanceRequest[]> {
        const url = `${this.baseUrl}/dances`;
        return this.http.get<DanceRequest[]>(url, this.getRequestOptions());
    }

    getForId(danceRequestId: number): Observable<DanceRequest> {
        const url = `${this.baseUrl}/dances/${danceRequestId}`;
        return this.http.get<DanceRequest>(url, this.getRequestOptions());
    }

    getForAvailabilityId(availabilityId: number): Observable<DanceRequest[]> {
        const url = `${this.baseUrl}/availability/${availabilityId}/dances`;
        return this.http.get<DanceRequest[]>(url, this.getRequestOptions());
    }

    book(availabilityId: number, request: BookDanceRequest): Observable<DanceRequest> {
        const url = `${this.baseUrl}/availability/${availabilityId}/dances`;
        return this.http.post<DanceRequest>(url, request, this.getRequestOptions());
    }

    search(query: string): Observable<DanceRequest[]> {
        const url = `${this.baseUrl}/dances/search?query=${encodeURIComponent(query)}`;
        return this.http.get<DanceRequest[]>(url, this.getRequestOptions());
    }

    update(danceId: number, request: DanceRequest): Observable<DanceRequest> {
        const url = `${this.baseUrl}/dances/${danceId}`;
        return this.http.post<DanceRequest>(url, request, this.getRequestOptions());
    }
}
