import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Private subject to store the value of whether the answer is correct or not
  private _isCorrect = new BehaviorSubject<boolean>(false);
  private _answer = new BehaviorSubject<number>(0);
  private _userAnswer = new BehaviorSubject<number>(NaN);

  // Observable that emits the value of whether the answer is correct or not
  isCorrect$ = this._isCorrect.asObservable();
  answer$ = this._answer.asObservable();
  userAnswer$ = this._userAnswer.asObservable();

  // Setters emit value it through the _Subject
  setIsCorrect(value: boolean) {
    this._isCorrect.next(value);
  }

  setAnswer(value: number) {
    this._answer.next(value);
  }

  setUserAnswer(value: number) {
    this._userAnswer.next(value);
  }

  getIsCorrect(): boolean {
    return this._isCorrect.value;
  }

  constructor() {}
}
