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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private navCtrl: NavController,
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

    if (id) {
      this.apiService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = data;
        this.addToRecentlyViewed(this.movie);

        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        this.isFavourite = favourites.some((m: any) => m.id === this.movie.id);
      });

      this.apiService.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast.slice(0, 10); // top 10 cast
        this.crew = data.crew.slice(0, 10); // top 10 crew
      });
    }

    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'true') {
      document.body.classList.add('dark');
    }
  }

  // For the recently viewed page
  addToRecentlyViewed(movie: any) {
    let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

    // Remove movie if it already exists
    recent = recent.filter((m: any) => m.id !== movie.id);

    // Add to front of the list
    recent.unshift(movie);

    // Limit to maximum of 14 (for page layout)
    recent = recent.slice(0, 14);

    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
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

  isFavourite: boolean = false;

  toggleFavourite() {
    let favourites = JSON.parse(localStorage.getItem('favourites') || '[]');

    if (this.isFavourite) {
      // Remove
      favourites = favourites.filter((m: any) => m.id !== this.movie.id);
      this.isFavourite = false;
    } else {
      // Add
      favourites.push(this.movie);
      this.isFavourite = true;
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  /* Go Back Button */
  goBack() {
    this.navCtrl.back();
  }


}
