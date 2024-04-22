import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [HttpClientModule, RouterModule, NgIf],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css'
})

export class CatImageComponent implements OnInit {
  title: string = `Here's a cat!`;
  isCorrect: boolean = false;
  answer: number = 0;
  userAnswer: number = NaN;
  private subscription: Subscription = new Subscription();

  // Fetch from cat API
  api_key: string = `live_oV30uAAhIprX4Lkg1LSUl5DWEMm4F7J1YKoxRasDEXZmPtrhVzliPFQIqJsFd5Iu`;
  base_url: string = `https://api.thecatapi.com/v1/images/search`;
  image_url = `${this.base_url}?api_key=${this.api_key}`;


  fetchCatImage() {

    this.httpClient.get<any>(this.image_url, { responseType: 'json'}).subscribe(response => {
      this.image_url = response[0].url;
    });
  }

  constructor(private userService: UserService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Subscribe to observables$ from the UserService
    // Whenever the value of observables$ changes, update the value of fields
    this.subscription = this.userService.isCorrect$.subscribe(value => {
      this.isCorrect = value;
    });

    this.subscription = this.userService.answer$.subscribe(value => {
      this.answer = value;
    });

    this.subscription = this.userService.userAnswer$.subscribe(value => {
      this.userAnswer = value;
    });

    // Fetch a cat image when the component is initialized
    this.fetchCatImage();
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
