import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, searchOutline, heart, homeOutline, sunnyOutline } from 'ionicons/icons';

// API 
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})

// Home Page Layout
export class HomePage implements OnInit {

  searchTerm: string = '';
  movies: any[] = [];
  pageTitle: string = "Today's Trending Movies";
  sortOption: string = 'default';

  constructor(private apiService: ApiService) {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,
      'search-outline': searchOutline,
      'heart': heart,
      'home-outline': homeOutline,
      'sunny-outline': sunnyOutline,
    });
  }

  ngOnInit() {
    this.apiService.getTrendingMovies().subscribe((data: any) => {
      this.movies = data.results;
      console.log(this.movies);
      this.sortMovies();
    });
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'true') {
      document.body.classList.add('dark');
    }
  }

  /* Add or Remove from Favourites button */
  toggleFavourite(movie: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    const index = favourites.findIndex((m: any) => m.id === movie.id);

    if (index > -1) {
      // REMOVE
      favourites.splice(index, 1);
    } else {
      // ADD
      favourites.push(movie);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  isFavourite(movieId: number): boolean {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    return favourites.some((m: any) => m.id === movieId);
  }


  /* For applying Dark Mode Toggle */
  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }

  /* Change Icon in Dark Mode */
  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }

  /* For Search Function */
  onSearch() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {

      this.pageTitle = `Search Results for "${this.searchTerm}"`; // update title with whats been searched

      this.apiService.searchMovies(this.searchTerm).subscribe((data: any) => {
        this.movies = data.results;
        this.sortMovies();
      });

    } else {

      this.pageTitle = "Today's Trending Movies"; // reset title to original

      this.apiService.getTrendingMovies().subscribe((data: any) => {
        this.movies = data.results;
        this.sortMovies();
      });

    }
  }

  /* For Sorting Search Option */
  sortMovies() {

    if (this.sortOption === 'az') {
      this.movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.sortOption === 'za') {
      this.movies.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (this.sortOption === 'dateAsc') {
      this.movies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    if (this.sortOption === 'dateDesc') {
      this.movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }
  }

}




