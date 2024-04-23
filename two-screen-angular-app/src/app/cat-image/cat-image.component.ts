import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { APIService } from '../services/api.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css',
})
/**
 * Represents the CatImageComponent class.
 * This component is responsible for displaying a cat image and managing user interactions.
 */
export class CatImageComponent implements OnInit, OnDestroy {
  title: string = `Here's a cat!`;
  isCorrect: boolean = false;
  answer: number = 0;
  userAnswer: number = NaN;
  image_url: string = '';
  private subscriptions: Subscription[] = [];
  /**
   * Creates an instance of CatImageComponent.
   * @param userService - The user service for managing user data.
   * @param apiService - The API service for fetching cat images.
   */
  constructor(
    private userService: UserService,
    private apiService: APIService
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Subscribes to user service observables and fetches a cat image.
   */
  ngOnInit(): void {
    // Subscribe to the isCorrect$ observable to get the latest value of isCorrect
    this.subscriptions.push(
      this.userService.isCorrect$.subscribe((value) => {
        this.isCorrect = value;
      }),
      this.userService.answer$.subscribe((value) => {
        this.answer = value;
      }),
      this.userService.userAnswer$.subscribe((value) => {
        this.userAnswer = value;
      }),
      this.apiService.image_url$.subscribe((value) => {
        this.image_url = value;
      })
    );

    // Fetch a cat image
    this.apiService.fetchCatImage();
  }

  /**
   * Lifecycle hook that is called when the component is about to be destroyed.
   * Unsubscribes from observables to prevent memory leaks.
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
