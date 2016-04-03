var express = require('express');
var Article_1 = require('../models/Article');
var router = express.Router();
router.get('/', function (req, res, next) {
    Article_1.Article.findAll().then(function (articles) {
        res.render('index', {
            title: 'Generator-Express MVC',
            articles: articles
        });
    });
});
module.exports = function (app) {
    app.use('/', router);
};
//# sourceMappingURL=home.js.map