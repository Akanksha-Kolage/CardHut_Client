import { Component, OnInit } from '@angular/core';
import { ChangePassword } from '../change-password';
import { EncrypDecrypService } from '../encryp-decryp.service';
import { ForgetPassword } from '../forget-password';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  changePassword:ChangePassword=new ChangePassword();
  forgotPassword:ForgetPassword;
  message:string="";
  error:string="";

  constructor(private registerService:RegisterService,private encryp:EncrypDecrypService) { }

  ngOnInit(): void {
  }

  sendOtp(){
    this.registerService.forgotPassword(this.changePassword.userId)
    .subscribe(
      fp=>{
        this.forgotPassword=fp;
        this.message=fp.message;
       
      }
    )

  }

  resetPassword(){
  
    if(this.forgotPassword.otp==this.changePassword.otp){
      if(this.changePassword.newPassword==this.changePassword.confirmNewPassword){
       
        this.forgotPassword.user.userPassword= this.encryp.set('123456$#@$^@1ERF', this.changePassword.newPassword);
        this.registerService.updateUser(this.forgotPassword.user)
        .subscribe(
          updatedUser=>{
            this.message="Password changed";
          }
        )
      }
      else{
        this.error="Password and Confirm Password does not match"
      }
    }
    else{
      this.error="Invalid OTP";
    }
  }

}
