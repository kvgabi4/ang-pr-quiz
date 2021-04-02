import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { QuestionEditorComponent } from './pages/question-editor/question-editor.component';
import { QuizEditorComponent } from './pages/quiz-editor/quiz-editor.component';
import { QuizComponent } from './pages/quiz/quiz.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'quiz/:id',
    component: QuizComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'quiz-edit/:id',
    component: QuizEditorComponent,
  },
  {
    path: 'quiz-edit/:id/:questionId',
    component: QuestionEditorComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
