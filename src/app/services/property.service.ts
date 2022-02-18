import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestBody } from '../models/request-body';
import { BehaviorSubject, catchError, Subject, throwError } from 'rxjs';
import { interval, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  filter_body: RequestBody;
  response: any;
  responseSubject: Subject<any> = new Subject<any>();
  responseObservable$ = this.responseSubject.asObservable();

  errorMessage: String = "An unknown error occurred! :("

  emitLoadDataSuccess() {
    this.responseSubject.next(void 0);
  }

  getSingleProperty(id : String) {
    const url = `${environment.apiUrl}/property/${id}`;
    return this.http.get<any>(url)
      .pipe(catchError(error => this.handleError(error)));
  }

  getProperties(filter: any, page: number) {
    if (filter.params.furnishment != null && filter.params.furnishment.en == null) {
      filter.params.furnishment = null; // quick fix
    }

    const url = `${environment.apiUrl}/properties`;
    let params_object = new HttpParams();

    params_object = params_object.append('page', page);
    params_object = params_object.append('perpage', 20);

    const headers = { headers: new HttpHeaders().set('Content-Type', 'application/json'), params: params_object };

    return this.http.post<any>(url, filter, headers)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errorMessage = `Looks like an internet connection or some other client error. ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.errorMessage = `Our server returned an error(${error.status}). Please try again later!`;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  Init(): Promise<any> {
    this.filter_body = new RequestBody()
    return new Promise<void>(resolve => {
      this.getProperties(this.filter_body, 1).subscribe({
        next: data => {
          this.response = data;
          // console.log("load data...");
          this.emitLoadDataSuccess(); // here we are emitting event
        },
        error: error => {
          this.router.navigate(['error'])
        }
      });
      resolve();
    });
  }
}
