import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css'
})
export class CatImageComponent implements OnInit, OnDestroy {
  // Declare and initialize a boolean variable to track whether the answer is correct or not
  isCorrect: boolean = false;

  // Declare a private subscription variable of type Subscription to hold the subscription to the isCorrect$ observable
  private subscription: Subscription = new Subscription();

  // Inject the UserService dependency into the constructor
  constructor(private userService: UserService) { }

  // Implement the ngOnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to the isCorrect$ observable from the UserService
    // Whenever the value of isCorrect$ changes, update the value of isCorrect variable
    this.subscription = this.userService.isCorrect$.subscribe(value => {
      this.isCorrect = value;
    });
  }

  // Implement the ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }

}
