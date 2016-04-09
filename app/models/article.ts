import * as _ from 'lodash';

export default class Article {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.contents = data.contents;
  }

  public id: number;
  public title: string;
  public contents: string;
}

const internalArticle = new Article({
  id: 1,
  title: 'Some Article',
  contents: 'Hello world!'
});

export async function create(article: Article) {
  return Promise.resolve(Object.assign(article, { id: 2 }));
}

export async function get(id: number) {
  return Promise.resolve(internalArticle);
}

export async function getMultiple(ids: number[]) {
  let articles = [internalArticle].filter(a => _.includes(ids, a.id));
  return Promise.resolve(articles);
}

export async function getAll() {
  return Promise.resolve([internalArticle]);
}

export async function remove(id: number) {
  return Promise.resolve();
}

export async function update(id: number, article: Article) {
  return Promise.resolve(article);
}
