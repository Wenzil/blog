'use strict';

import * as hapi from 'hapi';
import * as HomeController from '../controllers/home';
import Article from '../models/article';

export default [
  {
    method: 'GET',
    path: '/',
    handler: function(request: hapi.Request, reply: hapi.IReply) {
      HomeController.getAllArticles()
        .then(reply)
        .catch(function(err) {
          reply(Boom.badImplementation('Could not retrieve all articles'));
        });
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: function(request: hapi.Request, reply: hapi.IReply) {
      const article = new Article(request.payload);

      HomeController.createArticle(article)
        .then(reply)
        .catch(function(err) {
          reply(Boom.badImplementation('Could not create new article', err));
        });
    },
  },
]
