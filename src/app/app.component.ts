import type {OnDestroy, OnInit} from '@angular/core';
import {Component} from '@angular/core';

import {
  BehaviorSubject, delay, map, Observable, of, Subject, switchMap, takeUntil
} from 'rxjs';

import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public stream$: Observable<number> = new Observable();

  public reload$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  public stream1$: Observable<number> = new Observable();

  public stream2$: Observable<number> = new Observable();

  public stream3$: Observable<number> = new Observable();

  private readonly destroyer$: Subject<void> = new Subject<void>();

  public constructor(private readonly appService: AppService) {
  }

  public ngOnInit(): void {
    this.stream$ = this.reload$.pipe(
      switchMap(() =>
        this.appService.getUpdate().pipe(
          map((result: number) => {
            this.stream3$ = of(result).pipe(delay(3000));
            this.stream2$ = of(result).pipe(delay(1000));
            this.stream1$ = of(result).pipe(delay(500));
            return result;
          })
        )),
    takeUntil(this.destroyer$),
    );
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  public onUpdate(): void {
    this.reload$.next();
  }
}
