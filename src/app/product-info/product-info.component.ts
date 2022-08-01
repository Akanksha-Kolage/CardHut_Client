import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../card';
import { Product } from '../product';
import { RegisterService } from '../register.service';
import { TransProductCard } from '../trans-product-card';
import { Transaction } from '../transaction';
import { User } from '../user';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {


  today = new Date();
  transaction: Transaction = new Transaction();
  transaction2: Transaction = new Transaction();
  user: User = new User();
  // totalAmount: number;
  // emiAmount: number;
  constructor(private registerService: RegisterService, private route: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.transaction.product = JSON.parse(sessionStorage.getItem("BuyProductDetails"));
    this.transaction.emiCard = JSON.parse(sessionStorage.getItem("cardInfo"));
    // console.log(this.transaction.product);
    // console.log(this.transaction.emiCard);
    // this.totalAmount= this.transaction.product.productCost + 0.032 * (this.transaction.product.productCost);
    // this.emiAmount= this.transaction.totalAmount / this.transaction.emiScheme;
  }
  createTransaction() {
  
    if (this.transaction.emiCard.emiCardBalance > this.transaction.product.productCost) {
      this.transaction.emiCard.emiCardBalance = this.transaction.emiCard.emiCardBalance - (this.transaction.emiScheme - 1) * (this.transaction.product.productCost / this.transaction.emiScheme);

      this.registerService.updateCard(this.transaction.emiCard).subscribe(
        crd => {
          sessionStorage.setItem("cardInfo", JSON.stringify(crd));
          console.log(crd);
        }
      );

      this.transaction.orderDate = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.today.getDate() + 1);
      this.transaction.totalAmount = this.transaction.product.productCost + 0.032 * (this.transaction.product.productCost);
      // this.transaction.totalAmount = this.transaction.product.productCost;
      this.transaction.paidAmount = (this.transaction.product.productCost / this.transaction.emiScheme) + 0.032 * (this.transaction.product.productCost);
      this.transaction.balanceAmount = this.transaction.totalAmount - this.transaction.paidAmount;
      this.transaction.emiPaid = 1;
      this.transaction.emiRemaining = this.transaction.emiScheme - this.transaction.emiPaid;
      // this.transaction.emiCard.emiCardBalance = this.transaction.emiCard.emiCardBalance - this.transaction.paidAmount;
      console.log(this.transaction);
      this.registerService.createTransaction(this.transaction)
        .subscribe(
          tr => {
            this.transaction2 = tr;
            console.log(JSON.stringify(this.transaction2));
            sessionStorage.setItem("transactionInfo", JSON.stringify(this.transaction2));
            this.route.navigate(['/transactionReceipt']);
          }
        );
    }
    else {
      alert("Insufficient Balance.")
    }
    
  }

}
