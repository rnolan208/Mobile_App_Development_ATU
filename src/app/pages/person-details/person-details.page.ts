import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, heart, homeOutline, sunnyOutline, timeOutline, listOutline, gridOutline, arrowBack } from 'ionicons/icons';

// API
import { ApiService } from '../../services/api.service';

// Go Back Button via Navcontroller
import { NavController } from '@ionic/angular';

// Storage Service
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class PersonDetailsPage implements OnInit {

  person: any;
  movies: any[] = [];
  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private navCtrl: NavController,
    private storage: StorageService
  ) {
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
    const id = this.route.snapshot.paramMap.get('id');

    this.storage.loadDarkMode();
    this.viewMode = this.storage.getViewMode();

    if (id) {
      this.apiService.getPersonDetails(id).subscribe((data: any) => {
        this.person = data;
      });

      this.apiService.getPersonMovies(id).subscribe((data: any) => {
        this.movies = data.cast;
      });
    }
  }

  ionViewWillEnter() {
    this.viewMode = this.storage.getViewMode();
  }


  /* Add or Remove from Favourites button */
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
