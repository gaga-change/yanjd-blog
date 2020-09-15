'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
var hljs = require('highlight.js');
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
 
    return ''; // use external default escaping
  }
});
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.post.findOne({ id });
    if (!entity.mdRender) {
      entity.html = md.render(entity.markdown)
      entity.mdRender = true
      await strapi.services.post.update({ id }, {html: entity.html, mdRender: true})
    }
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
