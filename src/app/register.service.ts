import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin } from './admin-login';
import { Login } from './login';
import { LoginResponse } from './login-response';
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
}
