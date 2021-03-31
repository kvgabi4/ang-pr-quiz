import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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


  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => this.quizService.get(params.id))
  );
  colors: string[] = ['danger', 'primary', 'warning'];
  color: string = 'primary';

  // quiz$: Observable<Quiz> = this.quizService.get(1);

  questions$: Observable<Question[]> = this.questionService.list$;


  questionIdArray: number[] = [];
  currentQuestions: [] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
    this.questionService.getAll();

    this.quiz$.subscribe(item => {
      this.questionIdArray = item.questions;
      this.color = this.colors[item.id - 1];
      // console.log(this.color)
    })
  }

  submit() {
    document.querySelector('.summary')?.classList.remove('hide');
    document.querySelector('.quiz')?.classList.add('hide');
  }

  nextQuestion(form: NgForm, question: Question) {
    this.choosen == 'true' ? this.points += question.points : this.points;
    this.serialNumber < this.questionIdArray.length - 1 ? this.serialNumber += 1 : this.submit();
    // form.resetForm();
    form.reset();
  }
}
