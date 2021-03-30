import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quizzes$: Observable<Quiz[]> = this.quizService.list$;
  @Output() quiz: EventEmitter<Quiz> = new EventEmitter();

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
  }

  // chooseQuiz(quiz: Quiz): void {
  //   this.quiz.emit(quiz);
  //   console.log(quiz);
  // }

}
