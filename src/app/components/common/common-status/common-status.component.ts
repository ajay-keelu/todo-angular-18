import { Component, DoCheck, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/todo/task.service';
import { ModalComponent } from '../../modal/modal.component';
import { UtilityService } from '../../../services/utility/utility.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-common-status',
  standalone: true,
  imports: [HeaderComponent, CommonModule, TaskListComponent, ModalComponent, DropdownComponent],
  templateUrl: './common-status.component.html',
  styleUrl: './common-status.component.scss'
})
export class CommonStatusComponent implements OnInit, DoCheck {
  curDate: Date;
  Title: string;
  tasks: Task[];
  task: Task;
  isModelOpen: boolean;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private utility: UtilityService) {
    this.curDate = new Date();
    this.Title = '';
    this.tasks = [];
    this.task = new Task({});
    this.isModelOpen = false;
  }

  ngOnInit(): void {
    this.getTasks();
  }
  ngDoCheck(): void {
    this.isModelOpen = this.utility.isModelOpen;
  }
  getTasks(): void {
    this.route.data.subscribe(data => {
      this.Title = data['Title']
      this.Title == 'Active' ? this.getActiveTasks() : this.getCompetedTasks();
    })
  }

  getActiveTasks(): void {
    this.taskService.getActiveTasks().subscribe((data: Task[]) => this.tasks = data)
  }

  getCompetedTasks(): void {
    this.taskService.getCompletedTasks().subscribe((data: Task[]) => this.tasks = data)
  }

  editTask(event: Task | any) {
    this.task = event
    this.utility.isModelOpen = true;
  }
}
