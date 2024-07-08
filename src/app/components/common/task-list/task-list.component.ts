import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/Task';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/todo/task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() Title: string;
  @Input() tasks: Task[];
  @Input() showDetails: boolean;
  @Output() upadateTask: EventEmitter<any>;
  @Output() editTask: EventEmitter<any>;
  active: string;
  completed: string;
  division: HTMLDivElement | any


  constructor(private taskService: TaskService, private toastService: ToastrService) {
    this.Title = '';
    this.completed = "assets/fa/square-check-fill.svg"
    this.active = "assets/fa/square-check.svg";
    this.tasks = [];
    this.showDetails = false;
    this.upadateTask = new EventEmitter<any>();
    this.editTask = new EventEmitter<any>();
  }

  openDetailsDiv(ele: HTMLDivElement) {
    if (this.division) {
      this.division.classList.remove('toggle');
    }
    ele = ele.childNodes[0] as HTMLDivElement;
    ele.classList.add('toggle')
    this.division = ele
  }

  closeDetailsDiv(ele: HTMLDivElement) {
    ele = ele.childNodes[0] as HTMLDivElement;
    ele.classList.remove('toggle')
    this.division = null;
  }

  getTimeDiff(time: Date) {
    const diffInMs = new Date().getTime() - new Date(time).getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  }

  onEvent(event: Event) {
    event.stopPropagation();
  }

  edit(item: Task) {
    this.editTask.emit(item);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this task')) {
      this.taskService.delete(id).subscribe({
        next: () => this.toastService.info('Task deleted successfully'),
        error: (err) => this.toastService.error(err.error),
        complete: () => this.upadateTask.emit()
      })
    }
  }

  updateStatus(id: number) {
    this.taskService.updateStatus(id).subscribe({
      next: () => this.toastService.info('Task moved to ' + (this.Title == 'Active' ? 'Completed' : 'Active')),
      error: (err) => this.toastService.error(err.error),
      complete: () => this.upadateTask.emit()
    })
  }

}
