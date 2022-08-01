import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { RegisterService } from '../register.service';
import { UpdateProduct } from '../update-product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product = new Product();
  updateMessage: string;

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
    this.product = JSON.parse(sessionStorage.getItem("ProductDetails"));
    console.log(this.product);
  }

  editProduct() {
    this.registerService.updateProduct(this.product)
      .subscribe(
        updateProduct => {
          this.product = updateProduct.product; 
          sessionStorage.setItem("ProductDetails", JSON.stringify(this.product));
          console.log(this.product);
          this.updateMessage = updateProduct.msg;
          alert(this.updateMessage);
          // sessionStorage.setItem("ProductDetails", JSON.stringify(this.product));
        }
    );
    window.location.reload();

  }

}
