import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { User } from '../user';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users: NgIterable<User>;
  user: User = new User();

  constructor(private registerService: RegisterService, private route:Router) { }

  ngOnInit(): void {
    this.registerService.viewAllUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(this.users);
        }
      )
  }

  activate(userId:number) {
    this.registerService.activateUser(userId)
      .subscribe(
        bool => {
          this.user.eligible = bool;
        }
    );
    window.location.reload();
  }

}
