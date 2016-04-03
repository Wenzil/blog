import * as express from 'express';
import {Article} from '../models/Article';

let router = express.Router();

export = function(app: express.Express) {
  app.use('/', router);
};

router.get('/', function(req: express.Request, res: express.Response, next) {
  Article.findAll().then(function(articles) {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});
