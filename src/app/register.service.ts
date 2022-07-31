import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin } from './admin-login';
import { Card } from './card';
import { Login } from './login';
import { LoginResponse } from './login-response';
import { Product } from './product';
import { TransProductCard } from './trans-product-card';
import { Transaction } from './transaction';
import { UpdateProduct } from './update-product';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  registerUser(user: User): Observable<string> {
    return this.http.post("http://localhost:9191/users/signup", user,{responseType:'text'});
  }

  loginUser(login:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:9191/users/login", login);
  }

  adminLogin(adminLogin:AdminLogin):Observable<boolean>{
    return this.http.post<boolean>("http://localhost:9191/admin/login", adminLogin);
  }

  addProduct(product: Product): Observable<string> {
    return this.http.post("http://localhost:9191/products/addProduct", product, { responseType: 'text' });
  }

  viewAllProducts(): Observable<any> {
    return this.http.get("http://localhost:9191/products/viewAll");
  }

  getProduct(productId: number): Observable<Product> {
    return this.http.get<Product>("http://localhost:9191/products/"+productId);
  }

  updateProduct(product: Product): Observable<UpdateProduct> {
    return this.http.put<UpdateProduct>("http://localhost:9191/products/update", product);
  }

  viewAllUsers() :Observable<any> {
    return this.http.get("http://localhost:9191/users/viewAll");
  }

  activateUser(userId: number): Observable<boolean>{
    return this.http.put<boolean>("http://localhost:9191/admin/activate/" + userId, { observe: 'response' });
  }
  
  getCardById(userId: number): Observable<Card> {
    return this.http.get<Card>("http://localhost:9191/cards/viewEmiCard/" + userId);
  }
 
  createTransaction(transProductCard: TransProductCard): Observable<Transaction> {
    return this.http.post<Transaction>("http://localhost:9191/transaction/addTransaction", transProductCard);
  }
}
