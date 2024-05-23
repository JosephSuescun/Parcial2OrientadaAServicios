import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductoComponent } from '../producto/pages/producto/producto.component';
import { HomeModule } from '../home/home.module';
import { LoginComponent } from '../home/components/login/login.component';
export const authGuard: CanActivateFn = (route, state) => {
  console.log(1);
  const router = inject(Router);
  const token = localStorage.getItem("token_access");
  if(!token){
    router.navigate(["home"]);
    return false
  }
  return true;
};
