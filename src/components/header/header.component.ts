import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserClaims } from '@okta/okta-auth-js';
import { OktaAuthService } from 'src/services/okta-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isAuthenticated: boolean = false;
    userClaims?: UserClaims;

    constructor(public oktaAuth: OktaAuthService) {
        this.userClaims = undefined;
    }

    ngOnInit(): void {
        const subscription = this.oktaAuth.$isAuthenticated.subscribe((_isAuthenticated) => {
            this.isAuthenticated = _isAuthenticated;
            this.oktaAuth.getUserInfo().then(claims => {
                this.userClaims = claims;
            })
            .catch(reason => {
                console.log(reason);
                this.isAuthenticated = false;
            });
        }, (error) => {
            console.log(error);
        }, () => {
            subscription.unsubscribe();
        });
    }

    triggerLogout(): void {
        this.oktaAuth.logout().then(() => {
            this.userClaims = undefined;
            this.isAuthenticated = false;
        })
    }

    triggerLogin(): void {
        this.oktaAuth.login();
    }
}