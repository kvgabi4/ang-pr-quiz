import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends BaseService<Quiz> {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'quizzes');
  }
}
