import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Private subject to store the value of whether the answer is correct or not
  private _isCorrect = new BehaviorSubject<boolean>(false);

  // Observable that emits the value of whether the answer is correct or not
  isCorrect$ = this._isCorrect.asObservable();

  // Method to set the value of whether the answer is correct or not
  // It takes a boolean value as a parameter and emits it through the _isCorrect subject
  setIsCorrect(value: boolean) {
    this._isCorrect.next(value);
  }

  getIsCorrect(): boolean {
    return this._isCorrect.value;
  }

  constructor() {}
}
