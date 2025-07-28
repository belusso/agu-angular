import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoComponent } from '../user/user.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  styleUrls: ['./nav.component.scss'],
  imports: [
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    UserInfoComponent,
    FormsModule
  ],
})
export class NavComponent implements OnInit {

  userDialog: boolean = false
  @Output() filterChange = new EventEmitter<string>();
  filter: string = '';

  constructor(
    private authService: AuthService,
    private router: Router) { }

  logout() {
    this.authService.logout();
  }

  sendValueToParent(): void {
    this.filterChange.emit(this.filter);
  }

  addTask() {
    this.router.navigate(['/task/']);
  }

  showDialog() {
    this.userDialog = true;
  }

  ngOnInit() {
    // verificar se ta logado e tals
  }
}
