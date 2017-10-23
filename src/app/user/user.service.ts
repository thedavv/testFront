import { Injectable } from '@angular/core';
import { User } from "./user";
import { Http, Response } from "@angular/http";
import {HttpClient, HttpRequest, HttpEvent} from '@angular/common/http';
import 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/api/applicants';

  constructor(private http: Http, private httpclient: HttpClient) {
  }

  findAll(): Observable<User[]> {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  saveUser(user: User): Observable<User> {
    return this.http.post(this.apiUrl, user)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteUserById(id: number): Observable<boolean> {
    return this.http.delete(this.apiUrl + '/' + id)
    .map((res:Response) => res.json())
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    ;
  }

  findById(id: number): Observable<User> {
    return this.http.get(this.apiUrl + '/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Error'));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.apiUrl, user)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  // file upload
  pushWithFile(user: User, file:File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('applicant', JSON.stringify(user));

    console.log(file);
    console.log(user);

    const req = new HttpRequest('POST', 'http://localhost:8080/api/applicants', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpclient.request(req);
  }

  putFileToStorage(user: User, file:File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('applicant', JSON.stringify(user));

    console.log(file);
    console.log(user);

    const req = new HttpRequest('PUT', 'http://localhost:8080/api/applicants', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpclient.request(req);
  }
}