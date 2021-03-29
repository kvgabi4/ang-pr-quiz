import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student> {

  constructor(
    public config: ConfigService,
    public http: HttpClient,
  ) {
    super(config, http, 'students');
  }
}
