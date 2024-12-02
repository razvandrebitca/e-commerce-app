import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = environment.API_URL+'api/send-order';
  

  constructor(private http: HttpClient) {}

  sendOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }
}
