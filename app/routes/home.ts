'use strict';

import * as hapi from 'hapi';
import * as HomeController from '../controllers/home';
import Article from '../models/article';

const routes: hapi.IRouteConfiguration[] = [
  {
    method: 'GET',
    path: '/',
    handler(request: hapi.Request, reply: hapi.IReply) {
      HomeController.getAllArticles()
        .then(reply)
        .catch(err => reply(Boom.badImplementation('Could not retrieve all articles')));
    },
  },
  {
    method: 'POST',
    path: '/',
    handler(request: hapi.Request, reply: hapi.IReply) {
      const article = new Article(request.payload);

      HomeController.createArticle(article)
        .then(reply)
        .catch(err => reply(Boom.badImplementation('Could not create new article', err)));
    },
  },
];

export default routes;
