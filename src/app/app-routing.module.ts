import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent }   from './login/login.component';
import { LogoutComponent }   from './logout/logout.component';
import { PerfilComponent }   from './perfil/perfil.component';
import { RegisterComponent } from './register/register.component';
import { ProductsList }  from './products-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductsList },
  { path: 'logout', component: LogoutComponent },
  { path: 'perfil', component: PerfilComponent }
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