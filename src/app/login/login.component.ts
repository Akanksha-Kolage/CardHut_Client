import { Component, OnInit } from '@angular/core';
import { Login } from '../login';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:Login=new Login();
  message:String;
  constructor(private registerService:RegisterService) { }
 

  ngOnInit(): void {
  }

  loginUser(){
 
    this.registerService.loginUser(this.login)
      .subscribe(
        msg => {
          this.message = msg;
          console.log(this.message);
        }
      );
  }

}
