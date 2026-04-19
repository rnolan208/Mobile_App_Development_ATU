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

  constructor(private navCtrl: NavController) {
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
    this.loadFavourites();
    this.sortMovies();

    const saved = localStorage.getItem('viewMode');
      if (saved) this.viewMode = saved as 'grid' | 'list';

    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'true') {
      document.body.classList.add('dark');
    }
  }

  ionViewWillEnter() {
    // Reload page when page is refreshed
    this.loadFavourites();
  }

  loadFavourites() {
    this.favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  removeFavourite(movieId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }

    this.favourites = this.favourites.filter(m => m.id !== movieId);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
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

  /* For Sorting Option */
  sortMovies() {

    if (this.sortOption === 'az') {
      this.favourites.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (this.sortOption === 'za') {
      this.favourites.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (this.sortOption === 'dateAsc') {
      this.favourites.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
    }

    if (this.sortOption === 'dateDesc') {
      this.favourites.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    }
  }

  /* Set Movie View - Tile or List */
  setView(mode: 'grid' | 'list') {
  this.viewMode = mode;
  localStorage.setItem('viewMode', mode);
}

/* Go Back Button */
  goBack() {
    this.navCtrl.back();
  }

}
