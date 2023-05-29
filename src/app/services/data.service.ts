
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
  id: any;
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
}
