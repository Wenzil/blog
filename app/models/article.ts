import {Sequelize, DataTypes, Model} from 'sequelize';

interface ArticleInstance {
  title: string;
  url: string;
  text: string;
}

export let Article: Model<ArticleInstance, {}>;

export default function(sequelize: Sequelize, DataTypes: DataTypes) {
  Article = sequelize.define<ArticleInstance, {}>('Article', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    text: DataTypes.STRING
  });

  return Article;
};
