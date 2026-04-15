import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, heart, homeOutline } from 'ionicons/icons';

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

  constructor() {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,
      'heart': heart,
      'home-outline': homeOutline,
    });
  }

  ngOnInit() {
    this.loadFavourites();
    this.sortMovies();
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
    document.body.classList.toggle('dark');
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

}
