import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Availability, AvailabilityRequest } from "src/models/availability.model";
import { BaseService } from "./base.service";
import { OktaAuthService } from "./okta-auth.service";

@Injectable()
export class AvailabilityService extends BaseService {
    constructor(http: HttpClient, oktaAuthService: OktaAuthService) {
            super(http, oktaAuthService);
    }

    public getCurrent(): Observable<Availability[]> {
        return this.http.get<Availability[]>(`${this.baseUrl}/availability/current`);
    }

    public getForUser(): Observable<Availability[]> {
        return this.http.get<Availability[]>(`${this.baseUrl}/availability`,
            this.getRequestOptions());
    }

    public get(availabilityId: number): Observable<Availability> {
        return this.http.get<Availability>(`${this.baseUrl}/availability/${availabilityId}`,
            this.getRequestOptions());
    }

    public create(request: AvailabilityRequest): Observable<Availability> {
        return this.http.post<Availability>(`${this.baseUrl}/availability`, request, this.getRequestOptions());
    }
};