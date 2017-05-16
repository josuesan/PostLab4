import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { PerfilComponent }   from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { ProductsList }  from './products-list.component';
import { ProductsForm }  from './products-form.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductsList },
  { path: 'perfil', component: PerfilComponent },
  { path: 'agregar-producto', component: ProductsForm }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}