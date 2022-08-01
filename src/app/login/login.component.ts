import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login';
import { LoginResponse } from '../login-response';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login:Login=new Login();
  message:string;
  constructor(private registerService:RegisterService,private router:Router) { }
 

  ngOnInit(): void {
  }

  loginUser(){
 
    this.registerService.loginUser(this.login)
      .subscribe(
        logResp => {
          if(logResp.user!=null){
            if(logResp.user.eligible){         

              sessionStorage.setItem("userInfo", JSON.stringify(logResp.user));
  
              this.router.navigate(['/dashboard']);
  
              
  
            }
            else{
             
              this.message=logResp.message;
            }
          }
          else{
           
            this.message=logResp.message;
          }
        }
      );
  }

}
