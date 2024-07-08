import { Component, Input } from '@angular/core';
import { UtilityService } from '../../services/utility/utility.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],
  providers: [RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @Input() Title: string = ''

  constructor(private utility: UtilityService) { }

  modelOpen(): void {
    this.utility.isModelOpen = true;
  }
}
