import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Variables
  authUrl = environment.API_URL+'api/login';
  apiUrl = environment.API_URL+'api';
  registerUrl = environment.API_URL+'api/register';
  options: any;
  /**
   * Constructor
   * @param http The http client object
   */
  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }
  /**
   * Get an access token
   * @param e The email address
   * @param p The password string
   */
  login(e: string, p: string) {
    return this.http.post(this.authUrl, {
      email: e,
      password: p,
    }, this.options);
  }
  register(name: String, email: String, password: String, c_password:String) {
		return this.http.post(this.registerUrl, {
			name: name,
			email: email,
			password: password,
			c_password:c_password
		});
	}

  /**
   * Revoke the authenticated user token
   */
  logout() {
    this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
    return this.http.get(this.apiUrl + '/token/revoke', this.options);
  }
}

