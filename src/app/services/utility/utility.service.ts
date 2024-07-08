import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  isModelOpen: boolean;
  isLoading: BehaviorSubject<boolean>;
  constructor() {
    this.isModelOpen = false;
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  displayLoader() {
    this.isLoading.next(true);
  }

  hideLoader() {
    this.isLoading.next(false);
  }
}

/*

openModel() {
    this.isModelOpen.next(true);
  }

  closeModel() {
   this.isModelOpen.next(false);
  }

  isModelOpen: BehaviorSubject<boolean>;
*/