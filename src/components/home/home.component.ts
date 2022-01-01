import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserClaims } from '@okta/okta-auth-js';
import { OktaAuthService } from 'src/services/okta-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    isAuthenticated: boolean = false;

    constructor(public oktaAuth: OktaAuthService) {
        
    }

    ngOnInit(): void {
      this.oktaAuth.getUserInfo().then(claims => {
          this.isAuthenticated = true;
      })
      .catch(reason => {
        this.isAuthenticated = false;
      });
    }
}