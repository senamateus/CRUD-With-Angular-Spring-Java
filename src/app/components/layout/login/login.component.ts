import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor() {
    this.loginService.removerToken();
  }

  /*logar(){
   
    this.loginService.logar(this.login).subscribe({
      next: token => {
        if(token){
          this.loginService.addToken(token);
          this.router.navigate(['/admin/carros']);
        } else{
          alert('Usuário ou senha incorretos')
        }
      },
      error: erro =>{
        alert('deu erro')
      }

    });

  }*/

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        if (token) {
          this.loginService.addToken(token);
          if (this.loginService.hasPermission('USER')) {
            this.router.navigate(['/admin/marcas']);
          } else {
            this.router.navigate(['/admin/carros']);
          }
        } else {
          alert('Usuário ou senha incorretos');
        }
      },
      error: (erro) => {
        alert('Deu erro');
      },
    });
  }
}
