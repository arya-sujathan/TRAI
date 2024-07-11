import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private hostAddress = 'https://trai.ledgerwebb.com:8000/';
  // private hostAddress = 'http://127.0.0.1:8000/'

  constructor(private http: HttpClient) { }

  getloginCheck(url: string, data: any): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.hostAddress + url, data, { headers: header }).pipe(
      catchError((error: any) => {
        return throwError('something went wrong');
      })
    );
  }


  getData(url: string): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    
    return this.http.get<any[]>(this.hostAddress + url, { headers: header }).pipe(
      catchError(
        (error: any) => {
          return throwError('Something Wentwrong!')
        }
      )
    );
  }
  postData(url: string, data: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const header = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.post<any>(this.hostAddress + url, data, { headers: header }).pipe(
      catchError((error: any) => {
        return throwError('Something went wrong');
      })
    );
  }

  // --------------------------sidebar toggle -----------------------------------------------

  private sidebarState = new BehaviorSubject<boolean>(false);
  sidebarState$ = this.sidebarState.asObservable();
  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }
  setSidebarState(state: boolean) {
    this.sidebarState.next(state);
  }
  getSidebarState() {
    return this.sidebarState.value;
  }
}
