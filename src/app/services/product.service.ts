import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, scheduled, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Product{
    name:string
    totalPrice:number
    href:string
    rating:number
    description:string
}

@Injectable({
	providedIn: "root",
})
export class ProductService {
    selectedProduct;
    api_url = environment.API_URL;
    // data:Subject<string> = new Subject<string>();
    data:Product[]=[]
	constructor(private http:HttpClient) {}
    getProducts(){
        return this.http.get<Product[]>(this.api_url+'/api/products');
        
    }
}
