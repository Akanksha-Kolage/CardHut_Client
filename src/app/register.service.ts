import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './login';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }

  registerUser(user: User): Observable<string> {
    return this.http.post("http://localhost:9191/users/signup", user,{responseType:'text'});
  }

  loginUser(login:Login):Observable<string>{
    return this.http.post("http://localhost:9191/users/login", login,{responseType:'text'});
  }
}
