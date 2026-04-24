import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

//API
import { ApiService } from '../../services/api.service';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, heart, homeOutline, sunnyOutline, timeOutline, arrowBack } from 'ionicons/icons';

// Go Back Button via Navcontroller
import { NavController } from '@ionic/angular';

// Storage Service
import { StorageService } from '../../services/storage';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class MovieDetailsPage implements OnInit {

  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite: boolean = false;

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
      'arrow-back-outline': arrowBack,
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    // Load dark mode from storage service
    this.storage.loadDarkMode();

    if (id) {
      // Movie details
      this.apiService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = data;

        // Add to recently viewed
        this.storage.addRecent(this.movie);

        // Check favourite status
        this.isFavourite = this.storage.isFavourite(this.movie.id);
      });

      // Credits
      this.apiService.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast.slice(0, 10);
        this.crew = data.crew.slice(0, 10);
      });
    }
  }

  // FAVOURITES
  toggleFavourite() {
    this.storage.toggleFavourite(this.movie);
    this.isFavourite = this.storage.isFavourite(this.movie.id);
  }

  // DARK MODE
  toggleDarkMode() {
    this.storage.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.storage.isDarkMode();
  }

  // NAVIGATION
  goBack() {
    this.navCtrl.back();
  }
}