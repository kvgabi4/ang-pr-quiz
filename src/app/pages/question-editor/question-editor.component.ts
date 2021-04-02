import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  quizId: number = 0;
  newAnswer: Answer[] = [new Answer(), new Answer(), new Answer(), new Answer()];
  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.questionId) === 0) {
        let i = 0;
        const newQuestion = new Question()
        this.newAnswer.map(answer => {
          answer.id = i;
          i += 1;
        })
        newQuestion.answers = this.newAnswer;
        this.quizId = params.id;
        return of(newQuestion);
      }
      this.quizId = params.id;
      return this.questionService.get(params.questionId);
    })
  );

  clicked: boolean = false;
  trueFalse: boolean[] = [true, false];

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, question: Question): void {
    this.clicked = true;

    if (!question.id) {
      console.log(question.id)
      this.questionService.create(question)
        .subscribe(
          question => {
            this.quizService.get(this.quizId).subscribe(
              data => {
                data.questions.push(question.id);
                // console.log('data',data)
                this.quizService.update(data).subscribe(
                  () => {
                    this.router.navigate(['/quiz-edit/' + this.quizId]);
                  });
              })
        }
      )


      console.log('question-editor', question)
    } else {
      this.questionService.update(question).subscribe(
        () => this.router.navigate(['/quiz-edit/' + this.quizId])
      );
    }
    //console.log('onUpdate:',form.value, question)
  }

}
