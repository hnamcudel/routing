import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resole, reject) => {
      setTimeout(() => {
        resole(this.loggedIn)
      }, 800);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
