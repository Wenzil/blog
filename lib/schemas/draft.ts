import * as Joi from 'joi';

export default Joi.object()
  .keys({
    postId: Joi.number()
      .optional()
      .allow(null)
      .description('The id of the blog post being modified'),
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
      .description('The blog post title of the draft'),
    body: Joi.string()
      .min(1)
      .max(10000)
      .required()
      .description('The blog post body of the draft')
  });
