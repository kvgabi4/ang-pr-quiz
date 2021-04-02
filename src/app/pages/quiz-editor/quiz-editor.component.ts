import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }
      return this.quizService.get(params.id)
    })
  );

  questions$: Observable<Question[]> = this.questionService.list$;

  questionIdArray: number[] = [];
  colors: string[] = ['danger', 'primary', 'warning'];
  color: string = 'primary';
  serialNumber: number = 0;

  clicked: boolean = false;
  category: string = 'new';

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private questionService: QuestionService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
    this.questionService.getAll();

    this.quiz$.subscribe(item => {
      this.questionIdArray = item.questions;
      // this.color = this.colors[item.id - 1];
      // console.log(this.color)
    })
  }

  onUpdate(form: NgForm, quiz: Quiz): void {
    this.clicked = true;
    if (!quiz.id) {
      this.quizService.create(quiz);
      this.router.navigate(['/admin']);
      console.log('quiz-editor', quiz)
    } else {
      this.quizService.update(quiz).subscribe(
        () => this.router.navigate(['/admin'])
      );
    }
    //console.log('onUpdate:',form.value, quiz)
  }

  onDelete(question: Question, quiz: Quiz): void {
    let currentQuiz = new Quiz;
    if (window.confirm('Delete this question?')) {
      this.questionService.remove(question);
      this.quizService.get(quiz.id).subscribe(
        q => {
          this.questionIdArray = q.questions.filter(item => item !== question.id);
          q.questions = this.questionIdArray;
          currentQuiz = q;
          console.log(q.questions);
          q.title = 'HTML próba';
          console.log('q', q);
          this.quizService.update(currentQuiz).subscribe(
            () => {
              this.router.navigate(['/quiz-edit/' + quiz.id]);
            });
        });
    }
  }


}
