import * as Joi from 'joi';

export default Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(18)
      .required()
      .description('The username of the account to create'),
    password: Joi.string()
      .min(8)
      .max(256)
      .regex(/(?=^.{8,36}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      .required()
      .description('The password of the account to create' +
        '- The password length must be greater than or equal to 8' +
        '- The password must contain one or more uppercase characters' +
        '- The password must contain one or more lowercase characters' +
        '- The password must contain one or more numeric values' +
        '- The password must contain one or more special characters')
  });
