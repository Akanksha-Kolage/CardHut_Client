import { Component, NgIterable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: NgIterable<Product>;
  product: Product = new Product();

  constructor(private registerService: RegisterService, private route: Router) { }


  ngOnInit(): void {
    this.registerService.viewAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log(this.products);
        }
      )
  }

  viewProduct(productId:number) {
    this.registerService.getProduct(productId)
      .subscribe(
        prd => {
          this.product = prd;
          sessionStorage.setItem("BuyProductDetails", JSON.stringify(this.product));
          console.log(JSON.stringify(this.product));
          this.route.navigate(['/productInfo']);
        }
      );
  }

}
