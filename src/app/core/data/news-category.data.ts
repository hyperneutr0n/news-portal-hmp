import { NewsCategory } from "@models/news-category.model";

export const newsCategories: NewsCategory[] = [
  // News 1 -> World
  { newsId: 1, categoryId: 3 },

  // News 2 -> Technology & Science
  { newsId: 2, categoryId: 1 },
  { newsId: 2, categoryId: 2 },

  // News 3 -> Science
  { newsId: 3, categoryId: 2 },

  // News 4 -> Technology
  { newsId: 4, categoryId: 1 },

  // News 5 -> Health & Environment & Science
  { newsId: 5, categoryId: 5 },
  { newsId: 5, categoryId: 2 },

  // News 6 -> Entertainment
  { newsId: 6, categoryId: 4 },

  // News 7 -> Entertainment
  { newsId: 7, categoryId: 4 },

  // News 8 -> Health & Environment & Science
  { newsId: 8, categoryId: 5 },
  { newsId: 8, categoryId: 2 },

  // News 9 -> Entertainment
  { newsId: 9, categoryId: 4 },

  // News 10 -> World & Health & Environment
  { newsId: 10, categoryId: 3 },
  { newsId: 10, categoryId: 5 },

  // News 11 -> Science
  { newsId: 11, categoryId: 2 },
];
