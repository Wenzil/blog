function default_1(sequelize, DataTypes) {
    exports.Article = sequelize.define('Article', {
        title: DataTypes.STRING,
        url: DataTypes.STRING,
        text: DataTypes.STRING
    });
    return exports.Article;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=Article.js.map