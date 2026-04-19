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

    if (id) {
      this.apiService.getPersonDetails(id).subscribe((data: any) => {
        this.person = data;
      });

      this.apiService.getPersonMovies(id).subscribe((data: any) => {
        this.movies = data.cast;
      });
    }

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

  /* Go Back Button */
  goBack() {
    this.navCtrl.back();
  }


}
