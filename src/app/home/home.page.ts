import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline } from 'ionicons/icons';

// API 
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

// Home Page Layout
export class HomePage implements OnInit {

  searchTerm: string = '';
  movies: any[] = [];

  constructor(private apiService: ApiService) {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.apiService.getTrendingMovies().subscribe((data: any) => {
      this.movies = data.results;
      console.log(this.movies);
    });
  }


  /* For applying Dark Mode Toggle */
  toggleDarkMode() {
    document.body.classList.toggle('dark');
  }

  /* For Search Function */
  onSearch() {
    console.log("Searching:", this.searchTerm);
  }

}


 

