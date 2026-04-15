import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiKey = 'a579684d1b797e0eec95e2e3272f56c4';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getTrendingMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`
    );
  }

  searchMovies(query: string) {
  return this.http.get(
    `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`
  );
}

// Get movie -> details
getMovieDetails(id: string) {
  return this.http.get(
    `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`
  );
}

// Get movie -> creditsc, cast, crew members
getMovieCredits(id: string) {
  return this.http.get(
    `${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`
  );
}

// Cast and Crew Details
getPersonDetails(id: string) {
  return this.http.get(
    `${this.baseUrl}/person/${id}?api_key=${this.apiKey}`
  );
}

getPersonMovies(id: string) {
  return this.http.get(
    `${this.baseUrl}/person/${id}/movie_credits?api_key=${this.apiKey}`
  );
}

}
