import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Card} from "./types";
import {AuthentificationService} from "./authentification.service";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PostService {
  serverUrl = 'https://my-json-server.typicode.com';
  postsPath = '/bhubr/album-api/posts';

  constructor(private http: HttpClient, private authenticationService: AuthentificationService) {
  }

  async fetchWithTimeout(resource: any, options = {}) {

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  }

  getAllPosts(): Promise<Card[]> {
    return this.http
      .get<Card[]>(`https://album-api.benoithubert.me/api/posts`)
      .toPromise();
  }

  getPost(id: number): Promise<Card> {
    return this.http
      .get<Card>(`${this.serverUrl}${this.postsPath}/${id}`)
      .toPromise();
  }

  createPoste(title: string, description: string, picture: string) {


    console.log(this.authenticationService.currentUserValue.token)
    return this.http.post<any>('https://album-api.benoithubert.me/api/v2/posts', {title, description, picture}, {
      headers: new HttpHeaders().set('Authorization', "Bearer " + this.authenticationService.currentUserValue.token)
    })
      .toPromise()
  }

  deletePoste(id: number) {
    return this.http.delete<any>('https://album-api.benoithubert.me/api/v2/posts/' + id, {
      headers: new HttpHeaders().set('Authorization', "Bearer " + this.authenticationService.currentUserValue.token)
    })
      .toPromise()
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
