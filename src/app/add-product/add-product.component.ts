import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  message: string;

  constructor(private registerService: RegisterService, private route: Router) { }

  ngOnInit(): void {
  }
  
  addProduct() {
    this.registerService.addProduct(this.product)
      .subscribe(
        msg => {
          this.message = msg;
          console.log(JSON.stringify(this.message));
          alert(this.message);
          this.route.navigate(['/addProduct']);
        }
    );
  } 

}
