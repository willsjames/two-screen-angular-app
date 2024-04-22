import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-arithmetic-question',
  standalone: true,
  imports: [NgIf, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './arithmetic-question.component.html',
  styleUrl: './arithmetic-question.component.css'
})
export class ArithmeticQuestionComponent implements OnInit{
  private answer: number = 0;
  question: string = ``;
  userAnswer: number = NaN;
  message: string = `Well done! You got it right! Click the button to see your reward!`;

  // Inject the UserService in the constructor to access the isCorrect property
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.generateRandomQuestion();
  }

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

  isAnswerCorrect(userAnswer: number): boolean {
    return userAnswer === this.answer;
  }

  onSubmit(userAnswer: number, answerForm: any) {
    if (this.isAnswerCorrect(userAnswer)) {
      this.userService.setIsCorrect(true);
    } else {
      this.userService.setIsCorrect(false);
    }
    this.generateRandomQuestion();
    answerForm.resetForm();
  }

  getIsCorrect(): boolean {
    return this.userService.getIsCorrect();
  }

  getAnswer(): number {
    return this.answer;
  }
}

