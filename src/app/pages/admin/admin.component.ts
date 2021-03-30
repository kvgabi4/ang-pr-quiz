import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  quizzes$: Observable<Quiz[]> = this.quizService.list$;
  // clicked: boolean = false;

  phrase: string = '';
  filterKey: string = 'title';
  filterKeys: string[] = Object.keys(new Quiz());

  columnKey: string = 'id';

  constructor(
    private quizService: QuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
  }

  onColumnSelect(key: string): void {
    this.columnKey = key;
  }

  onDelete(quiz: Quiz): void {
    if (window.confirm('Delete this quiz?')) {
      this.quizService.remove(quiz)
    //     .subscribe(
    //   () => {
    //     this.users$ = this.userService.getAll();
    //   }
    // );
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.navigate([this.router.url]);
    }
  }

}
