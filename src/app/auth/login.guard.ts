import { CanActivateFn} from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  let router = inject(Router);

  if(loginService.hasPermission("USER") && state.url == '/admin/carros'){ 
    alert("você não tem permissão para acessar essa rota");
    router.navigate(['/admin/marcas']);    
    return false;
  }

  return true;
};
