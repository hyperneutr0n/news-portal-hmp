import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { Favorite } from '@models/favorite.model';
import { favorites } from '@data/favorite.data';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorites: Favorite[] = [];

  constructor(private storageService: StorageService) {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.favorites = this.storageService.getItem('favorites');
    if (!this.favorites) {
      this.favorites = favorites;
      this.storageService.setItem('favorites', favorites);
    }
  }

  isNewsLiked(userId: number, newsId: number): boolean {
    return !!this.favorites.find(
      (item) => item.userId === userId && item.newsId === newsId,
    );
  }

  createFavorite(favorite: Favorite): void {
    this.favorites.push(favorite);
    this.storageService.setItem('favorites', this.favorites);
  }

  deleteFavorite(newsId: number, userId: number) {
    const favoriteIndex = this.favorites.findIndex(
      (item) => item.newsId === newsId && item.userId === userId,
    );

    if (!(favoriteIndex > -1)) {
      return;
    }

    this.favorites.splice(favoriteIndex, 1);
    this.storageService.setItem('favorites', this.favorites);
  }

  getFavoritesByUser(userId: number): Favorite[] {
    return this.favorites.filter((item) => item.userId === userId);
  }
}
