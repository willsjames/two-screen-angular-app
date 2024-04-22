import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css'
})

export class CatImageComponent implements OnInit, OnDestroy {
  // Declare and initialize a boolean variable to track whether the answer is correct or not
  isCorrect: boolean = false;
  // Declare a private subscription variable of type Subscription to hold the subscription to the isCorrect$ observable
  private subscription: Subscription = new Subscription();


  api_key: string = `live_oV30uAAhIprX4Lkg1LSUl5DWEMm4F7J1YKoxRasDEXZmPtrhVzliPFQIqJsFd5Iu`;
  base_url: string = `https://api.thecatapi.com/v1/images/search`;
  image_url = `${this.base_url}?api_key=${this.api_key}`;

  fetchCatImage() {

    this.httpClient.get<any>(this.image_url, { responseType: 'json'}).subscribe(response => {
      this.image_url = response[0].url;
    });
  }

  // Inject the UserService and HttpClient dependencies into the constructor
  constructor(private userService: UserService, private httpClient: HttpClient) { }

  // Implement the ngOnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to the isCorrect$ observable from the UserService
    // Whenever the value of isCorrect$ changes, update the value of isCorrect variable
    this.subscription = this.userService.isCorrect$.subscribe(value => {
      this.isCorrect = value;
    });
    // fetch random cat image from api
    this.fetchCatImage();
  }

  // Implement the ngOnDestroy lifecycle hook
  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    this.subscription.unsubscribe();
  }

}
