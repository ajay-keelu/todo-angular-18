import { Component, DoCheck, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterOutlet } from '@angular/router';
import { UtilityService } from '../../services/utility/utility.service';
import { LoaderComponent } from '../common/loader/loader.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavComponent, DashboardComponent, RouterOutlet, LoaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = "To-Do App"
  constructor(private utility: UtilityService) {
  }

}
