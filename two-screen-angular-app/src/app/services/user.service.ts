import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  /**
   * Subject used to emit the correctness status of the user.
   */
  private _isCorrect = new Subject<boolean>();

  /**
   * Observable that emits the correctness status of the user.
   */
  isCorrect$ = this._isCorrect.asObservable();

  /**
   * Sets the correctness status of the user.
   * @param value - The correctness status to set.
   */
  setIsCorrect(value: boolean) {
    this._isCorrect.next(value);
  }

  constructor() {
  }
}
