import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotPageComponent } from './pages/not-page/not-page.component';
import { HomeAdminComponent } from './pages/admin/home-admin/home-admin.component';
import { CartProductComponent } from './pages/cart-product/cart-product.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { CProductComponent } from './pages/c-product/c-product.component';
import { TrangchuAdminComponent } from './pages/admin/trangchu-admin/trangchu-admin.component';
import { AddProductComponent } from './pages/admin/add-product/add-product.component';
import { UserHomeComponent } from './pages/admin/user-home/user-home.component';


const routes: Routes = [
  {path: '',component: HomePageComponent,children: [
  ]},


  {path: 'admin',component: HomeAdminComponent,children: [
    {path: '',redirectTo: "home",pathMatch: 'full'},
    {path: 'home',component: TrangchuAdminComponent},
    {path: 'add',component: AddProductComponent},
    {path: 'user',component: UserHomeComponent,},
  ]},
  {path: 'cart',component: CartProductComponent,},
  {path:'search/:searchTerm', component:HomePageComponent},
  {path:'tag/:tag', component:HomePageComponent},
  {path: 'signup',component: SignupComponent,},
  {path: 'signin',component: SigninComponent,},
  {path: 'food/:id',component: CProductComponent,},
  {path: '**',component: NotPageComponent,},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
},
)
export class AppRoutingModule { }
