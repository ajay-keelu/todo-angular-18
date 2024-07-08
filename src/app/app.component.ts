import { Component, DoCheck } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthenticationComponent } from './components/user-authentication/user-authentication.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { UtilityService } from './services/utility/utility.service';
import { TaskListComponent } from './components/common/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserAuthenticationComponent, SidenavComponent, DashboardComponent, ModalComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements DoCheck {
  title = 'To-Do App';
  isModelOpen: boolean;
  constructor(private utility: UtilityService) {
    this.isModelOpen = false;
  }
  ngDoCheck(): void {
    this.isModelOpen = this.utility.isModelOpen;
  }
}
