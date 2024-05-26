import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  private repositoriesSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getUser() {
    return this.userSubject.asObservable();
  }

  getRepositories() {
    return this.repositoriesSubject.asObservable();
  }

  fetchUserData(username: string) {
    this.http.get<any>(`https://api.github.com/users/${username}`).subscribe({
      next: (user) => {
        this.userSubject.next(user);
        this.fetchRepositories(username);
      },
      error: (error) => {
        this.userSubject.next(null);
        this.handleError(error);
      }
    });
  }

  fetchRepositories(username: string) {
    this.http.get<any[]>(`https://api.github.com/users/${username}/repos?sort=stars&order=desc`).subscribe({
      next: (repos) => {
        this.repositoriesSubject.next(repos);
      },
      error: (error) => {
        this.repositoriesSubject.next([]);
        this.handleError(error);
      }
    });
  }

  private handleError(error: any) {
    // Aqui você pode implementar a lógica de tratamento de erros
    console.error('An error occurred:', error);
  }
}
