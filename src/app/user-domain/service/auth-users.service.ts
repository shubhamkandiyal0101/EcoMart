import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthUsersService {

  constructor(private httpClient:HttpClient, private router: Router) {}

  getUserToken(tokenType:string="accessToken") {
    const userTokenStr = localStorage.getItem('user_token');

    if(!userTokenStr?.length) return "";
    if(userTokenStr.length < 10) return "";

    try {
      const userToken = JSON.parse(userTokenStr);

      if(tokenType == "accessToken") {
        return userToken["access_token"]
      } else {
        return userToken["refresh_token"]
      }

    } catch {
      return "";
    }
  }

  
  // check is user logged in or not
  isLoggedIn() {

    const userTokenStr = localStorage.getItem('user_token');

    if(!userTokenStr?.length) return false;
    if(userTokenStr.length < 10) return false;

    try {
      const userToken = JSON.parse(userTokenStr);
      if(!userToken["access_token"]) return false;
      
      return true;

    } catch {
      return false;
    }

  }
  // ends here ~ check is user logged in or not

  // get user profile
  getUserProfile() {
    return this.httpClient.get(`${API_URL}/auth/profile`)
  }
  // ends here ~ get user profile

  logout() {
    localStorage.removeItem("user_token");
    this.router.navigate(['/login'])
  }


}
