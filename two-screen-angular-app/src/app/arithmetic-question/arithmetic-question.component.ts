import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-arithmetic-question',
  standalone: true,
  imports: [RouterModule, NgIf, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './arithmetic-question.component.html',
  styleUrl: './arithmetic-question.component.css'
})
export class ArithmeticQuestionComponent implements OnInit{

  private answer: number = 0;
  question: string = ``;
  isSubmitted: boolean = false;
  userAnswer: number = NaN;
  messageWhenCorrect: string = `Well done! You got it right! Click the button to see your reward!`;
  messageWhenIncorrect: string = `boooooooo you're wrong. Try again!`;


  // Inject the UserService in the constructor to access the isCorrect property
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.generateRandomQuestion();
    this.isSubmitted = false;
    this.userAnswer = NaN;
    this.userService.setIsCorrect(false);
  }

  getRandomInt() {
    return Math.floor(Math.random() * 10 + 1);
  }

  generateRandomQuestion() {
    const firstNumber = this.getRandomInt();
    const secondNumber = this.getRandomInt();
    const answer = firstNumber + secondNumber;
    this.answer = answer;
    const question = `${firstNumber} + ${secondNumber}`;
    this.question = question;
  }

  isAnswerCorrect(userAnswer: number): boolean {
    return userAnswer === this.answer;
  }

  onSubmit(userAnswer: number, answerForm: any) {
    if (this.isAnswerCorrect(userAnswer)) {
      this.userService.setIsCorrect(true);
      this.userService.setAnswer(this.answer);
      this.userService.setUserAnswer(userAnswer);
      answerForm.resetForm();
      answerForm.form.controls['userAnswer'].disable();
    } else {
      this.userService.setIsCorrect(false);
      this.generateRandomQuestion();
      answerForm.resetForm();
    }
    this.isSubmitted = true;

  }

  getIsCorrect(): boolean {
    return this.userService.getIsCorrect();
  }

  getAnswer(): number {
    return this.answer;
  }
}

