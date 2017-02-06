import * as Joi from 'joi';

export default Joi.object()
  .keys({
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
      .description('The title of the blog post'),
    contents: Joi.string()
      .min(1)
      .max(10000)
      .required()
      .description('The contents of the blog post')
  });
