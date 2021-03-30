import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { ConfigService } from 'src/app/service/config.service';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  isSubmitted = false;
  questionsNumber: number = 0;
  serialNumber: number = 0;
  points: number = 0;
  choosen: string = '';

  quiz$: Observable<Quiz> = this.quizService.get(2);

  questions$: Observable<Question[]> = this.questionService.list$;


  questionIdArray: number[] = [];
  currentQuestions: [] = [];


  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
    this.questionService.getAll();

    this.quiz$.subscribe(item => {
      this.questionIdArray = item.questions;
    })
  }

  submit() {
    document.querySelector('.summary')?.classList.remove('hide');
    document.querySelector('.quiz')?.classList.add('hide');
  }

  nextQuestion(form: NgForm, question: Question) {
    this.choosen == 'true' ? this.points += question.points : this.points;
    this.serialNumber < this.questionIdArray.length-1 ? this.serialNumber += 1 : this.submit();
  }
}
