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
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.page.html',
  styleUrls: ['./recently-viewed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RecentlyViewedPage implements OnInit {

  recent: any[] = [];
  movies: any[] = [];
  sortOption: string = 'default';
  viewMode: 'grid' | 'list' = 'grid';


  loadRecent() {
    this.recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }

  constructor(private navCtrl: NavController,) {
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

    // Load dark mode
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

  /* Set Movie View - Tile or List */
  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    localStorage.setItem('viewMode', mode);
  }

  /* Go Back Button */
  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
  this.loadRecent();

  const savedView = localStorage.getItem('viewMode') as 'grid' | 'list';
  if (savedView) {
    this.viewMode = savedView;
  }
}

}
