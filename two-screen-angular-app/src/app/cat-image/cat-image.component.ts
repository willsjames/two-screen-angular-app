import { Component } from '@angular/core';

@Component({
  selector: 'app-cat-image',
  standalone: true,
  imports: [],
  templateUrl: './cat-image.component.html',
  styleUrl: './cat-image.component.css'
})
export class CatImageComponent {
  isCorrect: boolean = false;
  constructor() { }

}
