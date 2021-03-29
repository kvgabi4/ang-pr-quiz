import { Injectable } from '@angular/core';

export interface ITableCol {
  key: string;
  title: string;
  type?: string;
  icon?: string;
  order?: number;
  pattern?: string;
  required?: boolean;
  visible?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'http://localhost:3000';

  studentTableColumns: ITableCol[] = [
    {
      key: 'id',
      title: '#',
    },
    {
      key: 'name',
      title: 'Name',
      visible: true,
    },
    {
      key: 'email',
      title: 'Email',
      visible: true,
    },
    {
      key: 'points',
      title: 'Points',
      visible: true,
    },
    {
      key: 'active',
      title: 'Active',
    },
  ];

  questionTableColumns: ITableCol[] = [
    {
      key: 'id',
      title: '#',
    },
    {
      key: 'question',
      title: 'Question',
      visible: true,
    },
    {
      key: 'answers',
      title: 'Answers',
      visible: true,
    },
    {
      key: 'points',
      title: 'Points',
      visible: true,
    },
    {
      key: 'active',
      title: 'Active',
    },
  ];

  quizTableColumns: ITableCol[] = [
    {
      key: 'id',
      title: '#',
    },
    {
      key: 'title',
      title: 'Title',
      visible: true,
    },
    {
      key: 'description',
      title: 'Description',
      visible: true,
    },
    {
      key: 'questions',
      title: 'Questions',
      visible: true,
    },
    {
      key: 'active',
      title: 'Active',
    },
  ];

  constructor() { }
}
