import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Purchase } from './../model/purchase';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.http.post<GetResponsePurchase>(`${this.apiServerUrl}/checkout/purchase`, purchase);
    // .pipe(
    //   map(response=> response.orderTrackingNumber) checkout/purchase
    // )
  }

  placeToOrder(purchase: Purchase): Observable<any> {
    return this.http.post<GetResponsePurchase>(`${this.apiServerUrl}/checkout/placeToOrder`, purchase);
  }


  place2Order(purchase: Purchase, id: number): Observable<any> {
    return this.http.post<GetResponsePurchase>(`${this.apiServerUrl}/checkout/placeToOrder?id=${id}`, purchase);

  }


}

interface GetResponsePurchase{
  orderTrackingNumber: string;
}

interface GetResponsePurchase{
  orderTrackingNumber: string;
}
