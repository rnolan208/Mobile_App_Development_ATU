import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, heart, homeOutline, sunnyOutline, timeOutline, listOutline, gridOutline, arrowBack } from 'ionicons/icons';

// Go Back Button via Navcontroller
import { NavController } from '@ionic/angular';

// Storage Service
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];
  sortOption: string = 'default';
  viewMode: 'grid' | 'list' = 'grid';
  movies: any[] = [];

  constructor(private navCtrl: NavController, private storage: StorageService) {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,
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
    this.storage.loadDarkMode();
    this.viewMode = this.storage.getViewMode();
  }

  ionViewWillEnter() {
    this.loadFavourites();
    this.viewMode = this.storage.getViewMode();
  }

  // Favourites
  loadFavourites() {
    this.favourites = this.storage.getFavourites();
    this.sortMovies();
  }

  removeFavourite(movieId: number, event?: Event) {
    if (event) event.stopPropagation();

    this.storage.removeFavourite(movieId);
    this.loadFavourites(); // refresh list
  }

  // Dark Mode
  toggleDarkMode() {
    this.storage.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.storage.isDarkMode();
  }


  // Sort
  sortMovies() {
    if (this.sortOption === 'az') {
      this.favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.sortOption === 'za') {
      this.favourites.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (this.sortOption === 'dateAsc') {
      this.favourites.sort((a, b) =>
        new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
      );
    }

    if (this.sortOption === 'dateDesc') {
      this.favourites.sort((a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }
  }

  //  VIEW MODE 
  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.storage.setViewMode(mode);
  }

  // NAVIGATION
  goBack() {
    this.navCtrl.back();
  }
}
