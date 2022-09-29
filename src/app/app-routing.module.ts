import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHistoryComponent } from "./components/order-history/order-history.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from './helpers/auth.gaurd';
const routes: Routes = [
  { path: 'orders', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
