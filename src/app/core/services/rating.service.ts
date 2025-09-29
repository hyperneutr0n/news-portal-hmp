import { Injectable } from '@angular/core';
import { ratings } from '@data/rating.data';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  getAverageRatingForNews(newsId: number): number {
    const filteredRatings = ratings.filter((r) => r.newsId === newsId);
    const newsRating =
      filteredRatings.reduce((acc, r) => acc + r.score, 0) /
      filteredRatings.length;

    const result = roundNumber(newsRating, 1);
    return result;
  }
}

function roundNumber(value: number, decimalPoint: number): number {
  const powerOfTen = Math.pow(10, decimalPoint);
  return Math.round(value * powerOfTen) / powerOfTen;
}
