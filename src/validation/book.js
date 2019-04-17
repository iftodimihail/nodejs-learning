import Joi from 'joi';

export default {
  store: {
    body: {
      name: Joi.string().required(),
      page_no: Joi.number().integer().required(),
      read: Joi.boolean().required()
    }
  },
  update: {
    body: {
      name: Joi.string().required(),
      page_no: Joi.number().integer().required(),
      read: Joi.boolean().required()
    }
  }
};
