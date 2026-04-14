import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

//API
import { ApiService } from '../../services/api.service';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline } from 'ionicons/icons';

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
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.apiService.getMovieDetails(id).subscribe((data: any) => {
        this.movie = data;
      });

      this.apiService.getMovieCredits(id).subscribe((data: any) => {
        this.cast = data.cast.slice(0, 5); // top 5 cast
        this.crew = data.crew.slice(0, 5); // top 5 crew
      });
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }

}
