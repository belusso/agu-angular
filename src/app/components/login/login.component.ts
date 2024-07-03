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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    CardModule,
    ProgressBarModule,
    InputGroupModule,
    InputGroupAddonModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  login() {
    this.loading = true
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/tasks']);
      }, error: (res) => {
        this.loading = false
        this.username = ''
        this.password = ''
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${res.status} - ${res.error.message || res.message}`
        });
      }
    })
  }

  goToPage(pagename: string) {
    this.router.navigate([pagename]);
  }
}
