import { Question } from "./question";

export class Quiz {
  id: number = 0;
  title: string = '';
  image: string = '';
  description: string = '';
  questions: number[] = [];
  active: boolean = false;
}
