import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppService {
  private readonly httpApi = 'https://api.rand.by/v1/integer?count=1';

  public constructor(private readonly httpClient: HttpClient) {
  }

  public getUpdate(): Observable<number> {
    return this.httpClient.get<{ items: number[] }>(this.httpApi).pipe(
      map((result: { items: number[] }) => {
        return result.items[0]
      }),
    );
  }
}
