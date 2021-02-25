import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  GithubUrl: string = "https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc"
  constructor(private _HttpClient: HttpClient) { }


}
