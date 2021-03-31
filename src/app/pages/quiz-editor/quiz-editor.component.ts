import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss']
})
export class QuizEditorComponent implements OnInit {

  // user$: Observable<User> = this.activatedRoute.params.pipe(
  //   switchMap( params => {
  //     if (Number(params.id) === 0) {
  //       return of(new User());
  //     }

  //     return this.userService.get(Number(params.id));
  //   })
  // );

  // quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
  //   switchMap(params => {
  //     if (Number(params.id) === 0) {
  //       return of(new Quiz());
  //     }
  //     return this.quizService.get(params.id));
  //   })
  // );

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }
      return this.quizService.get(params.id)
    })
  );

  clicked: boolean = false;
  category: string = 'new';

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, quiz: Quiz): void {
    this.clicked = true;
    if (!quiz.id) {
      this.quizService.create1(quiz);
      this.router.navigate(['/admin']);
      console.log('quiz-editor', quiz)
      } else {
        this.quizService.update(quiz).subscribe(
          () => this.router.navigate(['/admin'])
          );
        }
        //console.log('onUpdate:',form.value, quiz)
  }


}
