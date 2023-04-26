
import { Injectable } from '@angular/core';

export interface HomeTab {
  title: string
};

export interface NotificationsCard {
  image: string,
  title: string,
  time: number
}

export interface Notification {
  all: Array<NotificationsCard>,
  deals: Array<NotificationsCard>,
  orders: Array<NotificationsCard>,
  others: Array<NotificationsCard>
}

export interface Product {
  name: string,
  image: Array<string>,
  size: string,
  color: string,
  cost_price: number,
  discount: number,
  offer: boolean,
  stock: number,
  description: string,
  currency: string,
  bought: number,
  shipping: number,
  rating: number,
  rating_count: number,
  store_rate: number,
  store_rating: number,
  store_rating_count: number,
  sold_by: string,
  specs: string,
  reviews: Array<Review>,
  store_reviews: Array<Review>,
  sizing: {
    small: number,
    okay: number,
    large: number
  },
  buyer_guarantee: string,
  sponsored: Array<Product>
}
export interface Review {
  image: string,
  name: string,
  comment: string,
  rating: number,
  images: Array<string>
}
export interface Cart {
  product: Product,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor() { }
  cart: any = [];
  current_product: any = {};

  current_user: any = {
    fname: 'User',
    uid: 'ALSIOCSIIUAISUC',
    did: 'JIOU-ASBB-C871-0345',
    aid: 'ASBB-ASBB-C871-0345',
    lname: 'User',
    email: 'user@mail.com',
    billing: [{card_number:'3124',expiry_date:'12/22'},{card_number:'4564',expiry_date:'03/25'}],
    address: [{ address_line_1: 'liberty square', address_line_2: 'victory square', city: 'timisoara', last_name: 'usrr', phone_number: 1125532553, zipcode: 12345, country: 'Romania', first_name: 'User', state: 'Timis' },
    { address_line_1: 'office', address_line_2: 'Office', city: 'Bucharest', last_name: 'User 3', phone_number: 1125532553, zipcode: 12345, country: 'Romania', first_name: 'User 1', state: 'Bucharest' }]
  };

  wish_cash = {
    currency: '$',
    amount: 0.00,
    history: [{ amount: 10 }, { amount: 20 }]
  };

  
}
