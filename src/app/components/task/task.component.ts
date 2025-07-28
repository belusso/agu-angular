import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    ProgressBarModule,
    InputTextareaModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  providers: [MessageService]
})
export class TaskComponent implements OnInit {

  loading: boolean = false
  idTask: number = 0
  form: FormGroup

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap?.subscribe(params => {
      this.idTask = parseInt(params.get('id') || '');
      if (this.idTask > 0) {
        this.loadTask()
      }
    });
  }

  loadTask() {
    this.loading = true
    this.taskService.getTaskById(this.idTask).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description
        });
      }, error: (res) => {
        this.loading = false
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Erro: ${res.status} - ${res.error.message || res.message}`,
        })
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 2000)
      }, complete: () => {
        this.loading = false
      }
    })
  }

  saveTask() {
    if (this.form.valid) {
      this.loading = true
      this.taskService.saveTask(this.idTask, this.form.value.title, this.form.value.description).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        }, error: (res) => {
          this.loading = false
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Erro: ${res.status} - ${res.error.message || res.message}`,
          })
        }
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `O campo título é obrigatório.`
      });
    }
  }

  goToPage(pagename: string) {
    this.router.navigate([pagename]);
  }
}
