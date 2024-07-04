import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-info',
  templateUrl: './user.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],

})
export class UserInfoComponent {
  visible: boolean = false;
  username: string = ''

  constructor(private authService: AuthService, private router: Router) {
    this.username = authService.getUsername()
  }

  showDialog() {
    this.visible = true;
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}