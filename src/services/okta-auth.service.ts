import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken, UserClaims } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class OktaAuthService {

  oktaAuth = new OktaAuth({
    clientId: environment.clientId,
    issuer: environment.issuer,
    redirectUri: environment.loginRedirectUri,
    pkce: true
  });

  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;

  constructor(private router: Router) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then(val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    const accessToken = await this.oktaAuth.tokenManager.get('accessToken');
    return !!accessToken && accessToken.expiresAt * 1000 > new Date().getTime();
  }

  getAccessToken(): AccessToken {
      return this.oktaAuth.tokenManager.getSync('accessToken');
  }

  login(originalUrl?: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'profile']
    });
  }

  getUserInfo(): Promise<UserClaims> {
      return this.oktaAuth.getUser();
  }

  async handleAuthentication() {
    const tokenContainer = await this.oktaAuth.token.parseFromUrl();

    this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
    this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);

    if (await this.isAuthenticated()) {
      this.observer?.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url') as string;
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.oktaAuth.signOut({
      postLogoutRedirectUri: environment.logoutRedirectUri
    });
  }
}