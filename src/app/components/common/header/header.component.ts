import { Component, Input } from '@angular/core';
import { UtilityService } from '../../../services/utility/utility.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() Title: string = ''


  constructor(private utility: UtilityService, private router: Router, private toastr: ToastrService) { }

  modelOpen(): void {
    this.utility.isModelOpen = true;
  }

  signOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
