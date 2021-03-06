import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends { id: number }> {

  entityName: string = '';
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  error$: Subject<string> = new Subject();

  constructor(
    public config: ConfigService,
    public http: HttpClient,
    @Inject('entityName') entityName: string,
  ) {
    this.entityName = entityName;
  }

  getAll(): void {
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityName}`,{ withCredentials: true })
      .subscribe(
        list => this.list$.next(list),
        err => console.error(err)
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}/${this.entityName}/${id}`,{ withCredentials: true });
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(
      `${this.config.apiUrl}/${this.entityName}`, entity)
      // .pipe(
      //   tap(e => {
      //     this.getAll();
      //     console.log(entity)
      //   })
      // );
  }

  // create1(entity: T): void {
  //   this.http.post<T>(`${this.config.apiUrl}/${this.entityName}`, entity
  //   ).subscribe(() => this.getAll());
  // }

  update(entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.config.apiUrl}/${this.entityName}/${entity.id}`,
      entity
    )
      .pipe(
      tap(e => this.getAll())
    )
  }

  remove(entity: T): void {
    this.http.delete<T>(
      `${this.config.apiUrl}/${this.entityName}/${entity.id}`,
    ).pipe(
      tap( e => this.getAll() )
    ).subscribe(
      () => {},
      err => this.error$.next(err)
    );
  }

}
