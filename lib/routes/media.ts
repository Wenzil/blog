import * as Router from 'koa-router';
import * as jwt from 'koa-jwt';
import * as Joi from 'joi';

import * as config from '../config';
import * as MediaController from '../controllers/media';
import requestValidation from '../middleware/request-validation';
import contentTypeValidation from '../middleware/content-type-validation';
import contentLengthValidation from '../middleware/content-length-validation';

const KB = 1024;

const router = new Router();

// TODO: Test this route
router.get(
  '/me/image',
  jwt({ secret: config.JWT_SECRET }),
  async (ctx) => {
    const uploader = ctx.state.user.sub;
    const images = await MediaController.getImagesByUploader(uploader);
    ctx.body = images;
  }
);

// TODO: Test this route
router.post(
  '/me/image',
  jwt({ secret: config.JWT_SECRET }),
  contentTypeValidation('image/*'),
  contentLengthValidation(200 * KB),
  async (ctx) => {
    const uploader = ctx.state.user.sub;
    const timestamp = Date.now();
    const addedImage = await MediaController.addImage(uploader, ctx.req, timestamp);
    ctx.body = addedImage;
  }
);

// TODO: Test this route
router.put(
  '/me/image/:imageId',
  jwt({ secret: config.JWT_SECRET }),
  contentTypeValidation('application/json'),
  requestValidation({
    params: { imageId: Joi.number() },
    body: {
      name: Joi.string()
        .required()
        .description('The name to give to the image')
    }
  }),
  async (ctx) => {
    const uploader = ctx.state.user.sub;
    const imageId = ctx.params.imageId;
    const metaData = {
      ...ctx.request.body
    };
    const updatedImage = await MediaController.updateImageMetaData(uploader, imageId, metaData);
    ctx.body = updatedImage;
  }
);

// TODO: Test this route
router.delete(
  '/me/image/:imageId',
  jwt({ secret: config.JWT_SECRET }),
  requestValidation({
    params: { imageId: Joi.number() }
  }),
  async (ctx) => {
    const uploader = ctx.state.user.sub;
    const imageId = ctx.params.imageId;
    const discardedImage = await MediaController.discardImage(uploader, imageId);
    ctx.body = discardedImage;
  }
);

export default router;
