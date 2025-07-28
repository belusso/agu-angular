import { Component } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { NgForOf } from "@angular/common";
import { NavComponent } from '../nav/nav.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    NavComponent,
    CardModule,
    ButtonModule,
    TableModule,
    ProgressBarModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class TaskListComponent {

  confirmDialog: boolean = false
  tasks: any[] = [];
  sub: Subscription | undefined;
  loading: boolean = false
  filter: string = ''

  constructor(
    private taskService: TaskService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  filteredTasks() {
    return this.tasks.filter(e => e.title.indexOf(this.filter) >= 0 || !this.filter)
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks
      }, error: (res) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${res.status} - ${res.error.message || res.message}`,
        })
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000)
      }, complete: () => {
        this.loading = false
      }
    })
  }

  edit(id: number) {
    this.router.navigate([`/task/${id}`]);
  }

  delete(id: number) {

    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.loading = true
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.loadTasks()
          }, error: (res) => {
            this.loading = false
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Erro: ${res.status} - ${res.error.message || res.message}`,
            })
          }
        })
      }
    });
  }

}
