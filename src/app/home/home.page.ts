import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, searchOutline, heart, homeOutline, sunnyOutline, timeOutline, listOutline, gridOutline, arrowBack } from 'ionicons/icons';

// API 
import { ApiService } from '../services/api.service';

// Go Back Button via Navcontroller
import { NavController } from '@ionic/angular';

// Storage Service
import { StorageService } from '../services/storage';


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
  viewMode: 'grid' | 'list' = 'grid';

  constructor(private apiService: ApiService, private navCtrl: NavController, private storage: StorageService,) {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,
      'search-outline': searchOutline,
      'heart': heart,
      'home-outline': homeOutline,
      'sunny-outline': sunnyOutline,
      'time-outline': timeOutline,
      'list-outline': listOutline,
      'grid-outline': gridOutline,
      'arrow-back-outline': arrowBack,
    });
  }

  ngOnInit() {
    // Load global settings
    this.storage.loadDarkMode();
    this.viewMode = this.storage.getViewMode();

    // Load movies
    this.apiService.getTrendingMovies().subscribe((data: any) => {
      this.movies = data.results;
      this.sortMovies();
    });
  }

  //Save which view (grid or list) was selected for viewing the movies
  ionViewWillEnter() {
    this.viewMode = this.storage.getViewMode();
  }

  // Add or Remove from Favourites button 
  toggleFavourite(movie: any, event?: Event) {
    if (event) {
      event.stopPropagation();
      this.storage.toggleFavourite(movie);
    }
  }

  isFavourite(movieId: number): boolean {
    return this.storage.isFavourite(movieId);
  }

  // Dark Mode
  toggleDarkMode() {
    this.storage.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.storage.isDarkMode();
  }

  // Search
  onSearch() {
    if (this.searchTerm.trim()) {
      this.pageTitle = `Search Results for "${this.searchTerm}"`;

      this.apiService.searchMovies(this.searchTerm).subscribe((data: any) => {
        this.movies = data.results;
        this.sortMovies();
      });

    } else {
      this.pageTitle = "Today's Trending Movies";

      this.apiService.getTrendingMovies().subscribe((data: any) => {
        this.movies = data.results;
        this.sortMovies();
      });
    }
  }

  // Sort
  sortMovies() {
    if (this.sortOption === 'az') {
      this.movies.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.sortOption === 'za') {
      this.movies.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (this.sortOption === 'dateAsc') {
      this.movies.sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    }

    if (this.sortOption === 'dateDesc') {
      this.movies.sort((a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }
  }

  // View Mode
  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.storage.setViewMode(mode);
  }

  // Navbar
  goBack() {
    this.navCtrl.back();
  }
}



