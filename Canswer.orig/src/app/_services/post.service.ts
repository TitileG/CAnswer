import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../_models/article';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Article[]>(`http://localhost:51587/api/Users/getPosts()`);
}

// getById(id: number) {
//     return this.http.get(`${environment.apiUrl}/users/${id}`);
// }

addPost(article: Article) {
    return this.http.post(`http://localhost:51587/api/Users/AddPost`, article).subscribe();
}

// update(article: Article) {
//     return this.http.put(`${environment.apiUrl}/users/${article.id}`, article);
// }

// delete(id: number) {
//     return this.http.delete(`${environment.apiUrl}/users/${id}`);
// }
}
