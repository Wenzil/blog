import * as Joi from 'joi';
import Err from '../util/err';

const minPasswordLength = 8;
const unmetPasswordRequirements =
`The password must contain at least ${minPasswordLength} characters including one uppercase,
 one lowercase and one numeric character`;

export default Joi.object()
  .keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(18)
      .required()
      .description('The username of the account to create'),
    password: Joi.string()
      .min(minPasswordLength)
      .max(36)
      .regex(/(?=.*\d)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
      .required()
      .description('The password of the account to create')
      .error(new Err('Unmet password requirements', unmetPasswordRequirements))
  });
