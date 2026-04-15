import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class FavouritesPage implements OnInit {

  favourites: any[] = [];

  constructor() {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,

    });
  }

  ngOnInit() {
    this.loadFavourites()
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

}
