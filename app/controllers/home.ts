'use strict';

import Article, * as ArticleModel from '../models/Article';

export async function createArticle(article: Article) {
  return ArticleModel.create(article);
}

export async function getAllArticles() {
  return ArticleModel.getAll();
}
