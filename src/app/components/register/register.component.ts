import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    ProgressBarModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/tasks']);
      }, error: (res) => {
        this.loading = false
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${res.status} - ${res.error.message}`
        });
      }
    })
  }

  register() {
    this.loading = true
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.login()
      }, error: (res) => {
        this.loading = false
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${res.status} - ${res.error.message || res.error.detail}`
        });
      }
    })
  }

  goToPage(pagename: string) {
    this.router.navigate([pagename]);
  }
}
