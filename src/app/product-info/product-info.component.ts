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
  transProductCard: TransProductCard = new TransProductCard();
  transaction: Transaction = new Transaction();
  transaction2: Transaction = new Transaction();

  constructor(private registerService: RegisterService, private route: Router) { }

  ngOnInit(): void {
    this.transProductCard.product = JSON.parse(sessionStorage.getItem("BuyProductDetails"));
    this.transProductCard.emiCard = JSON.parse(sessionStorage.getItem("cardInfo"));
    console.log(this.transProductCard.product);
    console.log(this.transProductCard.emiCard);
  }

  createTransaction() {
    this.transaction.orderDate = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      this.today.getDate());
    
    this.transaction.paidAmount = this.transProductCard.product.productCost / this.transaction.emiScheme;
    this.transaction.balanceAmount = this.transProductCard.product.productCost - this.transaction.paidAmount;
    this.transaction.emiPaid = 1;
    this.transaction.emiRemaining = this.transaction.emiScheme - this.transaction.emiPaid;
    
    this.transProductCard.transaction = this.transaction;
    console.log(this.transProductCard.transaction);
    this.registerService.createTransaction(this.transProductCard)
      .subscribe(
        tr => {
          this.transaction2 = tr;
          console.log(JSON.stringify(this.transaction2));
          this.route.navigate(['/transactionReceipt']);
        }
      );
  }

}
