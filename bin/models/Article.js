"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const _ = require('lodash');
class Article {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.contents = data.contents;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Article;
const internalArticle = new Article({
    id: 1,
    title: 'Some Article',
    contents: 'Hello world!'
});
function create(article) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(Object.assign(article, { id: 2 }));
    });
}
exports.create = create;
function get(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(internalArticle);
    });
}
exports.get = get;
function getMultiple(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        let articles = [internalArticle].filter(a => _.includes(ids, a.id));
        return Promise.resolve(articles);
    });
}
exports.getMultiple = getMultiple;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve([internalArticle]);
    });
}
exports.getAll = getAll;
function remove(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve();
    });
}
exports.remove = remove;
function update(id, article) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(article);
    });
}
exports.update = update;
//# sourceMappingURL=Article.js.map