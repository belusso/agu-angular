import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    CardModule,
    ReactiveFormsModule,
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

  form: FormGroup
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.form.value.username, this.form.value.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', this.form.value.username);
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
    if (this.form.valid) {
      this.loading = true
      this.authService.register(this.form.value.username, this.form.value.password).subscribe({
        next: () => {
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
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Os campos usuário e senha são obrigatórios.`
      });
    }
  }

  goToPage(pagename: string) {
    this.router.navigate([pagename]);
  }
}
