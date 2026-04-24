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
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.page.html',
  styleUrls: ['./recently-viewed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class RecentlyViewedPage implements OnInit {

  recent: any[] = [];
  sortOption: string = 'default';
  viewMode: 'grid' | 'list' = 'grid';


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
    this.loadRecent();
    this.viewMode = this.storage.getViewMode();
  }

  // LOAD RECENT
  loadRecent() {
    this.recent = this.storage.getRecent();
  }

  // FAVOURITES
  toggleFavourite(movie: any, event?: Event) {
    if (event) event.stopPropagation();
    this.storage.toggleFavourite(movie);
  }

  isFavourite(movieId: number): boolean {
    return this.storage.isFavourite(movieId);
  }

  // DARK MODE
  toggleDarkMode() {
    this.storage.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.storage.isDarkMode();
  }

  // View Mode
  setView(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.storage.setViewMode(mode);
  }

  // NAVIGATION
  goBack() {
    this.navCtrl.back();
  }

  

}
