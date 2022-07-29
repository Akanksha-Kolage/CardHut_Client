import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CardComponent } from './card/card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { TransactionReceiptComponent } from './transaction-receipt/transaction-receipt.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
  path: '', component: LandingPageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'forgotPassword', component: ForgotpasswordComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'productInfo', component: ProductInfoComponent
  },
  {
    path: 'transactions', component: TransactionsComponent
  },
  {
    path: 'transactionReceipt', component: TransactionReceiptComponent
  },
  {
    path: 'card', component: CardComponent
  },
  {
    path: 'adminLogin', component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
