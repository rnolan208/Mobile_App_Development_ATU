import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Icons
import { addIcons } from 'ionicons';
import { moonOutline, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

// Home Page Layout
export class HomePage {

  searchTerm: string = '';

  dummyMovies = [
    { title: 'Movie 1', description: 'This is a short description...' },
    { title: 'Movie 2', description: 'Another movie description...' },
    { title: 'Movie 3', description: 'More placeholder text...' },
    { title: 'Movie 4', description: 'More placeholder text...' }
  ];

  constructor() {
    addIcons({
      'moon-outline': moonOutline,
      'heart-outline': heartOutline
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


 

