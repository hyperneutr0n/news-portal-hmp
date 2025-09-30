import { Injectable } from '@angular/core';
import { ratings } from '@data/rating.data';
import { Rating } from '@models/rating.model';
import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  private ratings: Rating[] = [];

  constructor(private storageService: StorageService) {
    this.loadRatings();
  }

  private loadRatings(): void {
    this.ratings = this.storageService.getItem('ratings');
    if (!this.ratings) {
      this.ratings = ratings;
      this.storageService.setItem('ratings', ratings);
    }
  }

  getAverageRatingForNews(newsId: number): number {
    const filteredRatings = this.ratings.filter((r) => r.newsId === newsId);
    const newsRating =
      filteredRatings.reduce((acc, r) => acc + r.score, 0) /
      filteredRatings.length;

    const result = roundNumber(newsRating, 1);
    return result;
  }

  getRatingForNewsByUser(userId: number, newsId: number): number | undefined {
    return this.ratings.find(
      (item) => item.userId === userId && item.newsId === newsId,
    )?.score;
  }

  createNewRating(rating: Rating): void {
    this.ratings.push(rating);
    this.storageService.setItem('ratings', this.ratings);
  }

  updateRating(rating: Rating): void {
    const ratingIndex = this.ratings.findIndex(
      (item) => item.userId === rating.userId && item.newsId === rating.newsId,
    );
    if (!(ratingIndex > -1)) {
      return;
    }
    this.ratings[ratingIndex].score = rating.score;
    this.storageService.setItem('ratings', this.ratings);
  }
}

function roundNumber(value: number, decimalPoint: number): number {
  const powerOfTen = Math.pow(10, decimalPoint);
  return Math.round(value * powerOfTen) / powerOfTen;
}
