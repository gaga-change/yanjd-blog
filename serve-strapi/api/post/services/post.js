'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async postRelation() {
    return await strapi.query('post').model.find().select('id tags category')
  }
};
