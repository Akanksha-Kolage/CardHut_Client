import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User=new User();
  message:string;
 

  constructor(private registerService:RegisterService) { }

  ngOnInit(): void {
  }

  register(){
    this.user.eligible=false;
  
    this.registerService.registerUser(this.user)
      .subscribe(
        msg => {
          this.message = msg;
      
        }
      );
    
  }

}
