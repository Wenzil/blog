import * as Joi from 'joi';

export default Joi.object()
  .keys({
    username: Joi.string()
      .required()
      .description('The username of the account to login'),
    password: Joi.string()
      .required()
      .description('The password of the account to login')
  });
