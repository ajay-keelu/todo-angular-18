import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  routes: any[];
  curRoute: string;
  dropdown: boolean;

  constructor(private router: ActivatedRoute) {
    this.curRoute = this.router.snapshot.routeConfig?.path as string;
    this.dropdown = false;
    this.routes = [
      {
        link: 'dashboard',
        value: 'Dashboard'
      }, {
        link: 'active',
        value: 'Active'
      },
      {
        link: 'completed',
        value: 'Completed'
      }
    ]
  }


  showDropdown(dropdown: boolean) {
    this.dropdown = dropdown
  }
}
