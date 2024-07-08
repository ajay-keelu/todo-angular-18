import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from '../../services/utility/utility.service';
import { TaskService } from '../../services/todo/task.service';
import { Task } from '../../models/Task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() Model: boolean;
  @Output() EmitTasks: EventEmitter<any>;
  @Output() EditTask: EventEmitter<any>;
  @Input() task: Task;

  constructor(private utility: UtilityService, private taskService: TaskService, private toastService: ToastrService) {
    this.Model = false
    this.task = new Task({});
    this.EditTask = new EventEmitter<any>();
    this.EmitTasks = new EventEmitter<any>();
  }

  submit(form: NgForm) {
    if (form.valid) {
      this.taskService.create(this.task).subscribe({
        next: data => { this.toastService.success(data); this.EmitTasks.emit() },
        error: err => this.toastService.error(err.error),
        complete: () => { this.closeModal(form) }
      });
    }
  }


  update(form: NgForm) {
    if (form.valid) {
      this.taskService.update(this.task).subscribe({
        next: data => { this.toastService.success(data); this.EmitTasks.emit() },
        error: err => this.toastService.error(err.error),
        complete: () => { this.closeModal(form) }
      });
    }
  }

  closeModal(form: NgForm) {
    this.utility.isModelOpen = false;
    this.task = new Task({})
    this.EditTask.emit();
    form.reset()
  }
}
