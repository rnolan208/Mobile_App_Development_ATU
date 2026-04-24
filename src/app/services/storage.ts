import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // ***** VIEW MODE *****
  getViewMode(): 'grid' | 'list' {
    return (localStorage.getItem('viewMode') as 'grid' | 'list') || 'grid';
  }

  setViewMode(mode: 'grid' | 'list') {
    localStorage.setItem('viewMode', mode);
  }

  // ***** DARK MODE *****
  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }

  loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }

  // ***** FAVOURITES *****
  getFavourites(): any[] {
    return JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  toggleFavourite(movie: any) {
    let favourites = this.getFavourites();

    const index = favourites.findIndex(m => m.id === movie.id);

    if (index > -1) {
      favourites.splice(index, 1);
    } else {
      favourites.push(movie);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
  }

  isFavourite(id: number): boolean {
    return this.getFavourites().some(m => m.id === id);
  }

  removeFavourite(id: number) {
    const updated = this.getFavourites().filter(m => m.id !== id);
    localStorage.setItem('favourites', JSON.stringify(updated));
  }

  // ***** RECENTLY VIEWED =====
  getRecent(): any[] {
    return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  }

  addRecent(movie: any) {
    let recent = this.getRecent();

    recent = recent.filter(m => m.id !== movie.id);
    recent.unshift(movie);
    recent = recent.slice(0, 14);

    localStorage.setItem('recentlyViewed', JSON.stringify(recent));
  }
}