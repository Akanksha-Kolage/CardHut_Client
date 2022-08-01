import { NgIf } from '@angular/common';
import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../card';
import { RegisterService } from '../register.service';
import { Transaction } from '../transaction';
import { User } from '../user';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: NgIterable<Transaction>;
  card: Card = new Card();
  transaction: Transaction = new Transaction();
  user: User = new User();
  constructor(private registerService: RegisterService, private route: Router) { 
    
  }

  ngOnInit(): void {
    if(sessionStorage.getItem("userInfo")==null){
      this.route.navigate(['/login']);
    }
      else{
      this.user = JSON.parse(sessionStorage.getItem("userInfo"));
      this.card = JSON.parse(sessionStorage.getItem("cardInfo"));
      this.registerService.viewAllTransactions(this.card.emiCardNo)
        .subscribe(
          data => {
            this.transactions = data;
            console.log(this.transactions);
          }
        )
    }

  }

  updateEmi(t:Transaction) {
    this.registerService.updateEmi(t)
      .subscribe(
        tr => {
          this.transaction = tr;
          console.log(tr.emiCard.emiCardBalance);
          console.log((this.transaction.product.productCost / this.transaction.emiScheme));
          this.transaction.emiCard.emiCardBalance = this.transaction.emiCard.emiCardBalance + (this.transaction.product.productCost / this.transaction.emiScheme);
          this.registerService.updateCard(this.transaction.emiCard).subscribe(
            crd => {
              sessionStorage.setItem("cardInfo", JSON.stringify(crd));
            }
          );
        }
      );
    window.location.reload();
  }
  logOut(){
    console.log("log out");
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("cardInfo");
    sessionStorage.removeItem("productInfo");
    sessionStorage.removeItem("transactionInfo");
    this.route.navigate(['/login']);

  }

}
