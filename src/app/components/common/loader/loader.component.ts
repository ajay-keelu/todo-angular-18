import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../services/utility/utility.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent implements OnInit {
  isLoading: boolean;
  constructor(private utility: UtilityService) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.utility.isLoading.subscribe(data => this.isLoading = data)
  }

}
