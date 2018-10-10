import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { CurrentUserService } from './current-user.service';
import { environment } from '../../../environments/environment';
import { LoggerService } from './logger.service';


const endpoint = 'http' + (environment.ssl ? 's://' : '://') + environment.apiHost;
const httpOptions = {
    headers: new HttpHeaders({
        // 'Authorization': 'Bearer ' + this.currentUser.get().token,
        'Content-Type':  'application/json'
    })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

    private currentUser: CurrentUserService;

    constructor(
        private logger: LoggerService,
        private http: HttpClient,
        currentUser: CurrentUserService
    ) {
        this.currentUser = currentUser;
    }

    private extractData(res: Response) {
        const body = res;
        return body || { };
    }

    getEvents(fromDay, toDay): Observable<any> {
        return this.http.get(endpoint + 'events/' + fromDay + '-' + toDay).pipe(
        map(this.extractData));
    }

    getProduct(id): Observable<any> {
        return this.http.get(endpoint + 'events/' + id).pipe(
          map(this.extractData));
    }

    addProduct (product): Observable<any> {
        console.log(product);
        return this.http.post<any>(endpoint + 'events', JSON.stringify(product), httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((product) => console.log(`added product w/ id=${product.id}`)),
            catchError(this.handleError<any>('addProduct'))
        );
    }

    updateProduct (id, product): Observable<any> {
        return this.http.put(endpoint + 'events/' + id, JSON.stringify(product), httpOptions).pipe(
            tap(_ => console.log(`updated product id=${id}`)),
            catchError(this.handleError<any>('updateProduct'))
        );
    }

    deleteProduct (id): Observable<any> {
        return this.http.delete<any>(endpoint + 'events/' + id, httpOptions).pipe(
            tap(_ => console.log(`deleted product id=${id}`)),
            catchError(this.handleError<any>('deleteProduct'))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          this.logger.error(error); // log to console instead
          this.logger.info(`${operation} failed: ${error.message}`);
          return of(result as T);
        };
      }

}
