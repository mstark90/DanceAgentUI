import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { OktaAuthService } from "./okta-auth.service";

export class BaseService {
    protected baseUrl = environment.baseUrl;
    constructor(protected http: HttpClient,
        protected oktaAuthService: OktaAuthService) {

    }

    protected getRequestOptions() {
        return {
            headers: this.getHeaders()
        };
    }

    protected getHeaders(): HttpHeaders {
        const accessToken = this.oktaAuthService.getAccessToken();

        if(!accessToken) {
            return new HttpHeaders({});
        }
        
        return new HttpHeaders({
            "Authorization": `Bearer ${accessToken.accessToken}`
        });
    }
}