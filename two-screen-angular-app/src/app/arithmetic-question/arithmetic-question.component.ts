import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arithmetic-question',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './arithmetic-question.component.html',
  styleUrl: './arithmetic-question.component.css'
})
export class ArithmeticQuestionComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    this.generateRandomQuestion();
  }

  answer: number = 0;
  question: string = ``;
  userAnswer: number = NaN;

  getRandomInt() {
    return Math.floor(Math.random() * 10);
  }
  generateRandomQuestion() {
    // generates two random integers
    const firstNumber = this.getRandomInt();
    const secondNumber = this.getRandomInt();
    // stores answer of their sum
    const answer = firstNumber + secondNumber;
    // answer stored in class variable
    this.answer = answer;
    // returns string of question
    const question = `${firstNumber} + ${secondNumber}`;
    this.question = question;
  }

  onSubmit(userAnswer: number, answerForm: any) {
    if (userAnswer === this.answer) {
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
    this.generateRandomQuestion();
    answerForm.resetForm();
  }

}
      // Display "Correct!" message in the cat-image component
      // You can achieve this by creating a shared service
      // 1. Create a new service file, e.g., shared.service.ts
      // 2. In the shared service, create a boolean property, e.g., isCorrect
      // 3. Inject the shared service in both arithmetic-question and cat-image components
      // 4. Set the value of isCorrect in the arithmetic-question component
      // 5. Access the value of isCorrect in the cat-image component
      // 6. Bind the value of isCorrect to the cat-image component in the template
      // 7. Update the cat-image component to display the "Correct!" message based on the value of isCorrect
      // No routing is needed for this scenario
