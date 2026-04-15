import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

//API
import { ApiService } from '../../services/api.service';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline, heart, homeOutline } from 'ionicons/icons';

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
    private apiService: ApiService
  ) {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline,
      'heart': heart,
      'home-outline': homeOutline,
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apiService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = data;

        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
        this.isFavourite = favourites.some((m: any) => m.id === this.movie.id);
      });

      this.apiService.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast.slice(0, 10); // top 10 cast
        this.crew = data.crew.slice(0, 10); // top 10 crew
      });
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
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


}
