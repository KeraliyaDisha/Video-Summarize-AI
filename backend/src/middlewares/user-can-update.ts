"use strict";
const lodash = require("lodash");

/**
 * `user-can-update` middleware
 */
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    strapi.log.info("In user-can-update middleware.");

    if (!ctx.state?.user) {
      strapi.log.error("You are not authenticated.");
      return ctx.badRequest("You are not authenticated.");
    }

    const params = ctx.params;
    const requestedUserId = params?.id;
    const currentUserId = ctx.state?.user?.id;

    if (!requestedUserId) {
      strapi.log.error("Missing user ID.");
      return ctx.badRequest("Missing or invalid user ID.");
    }

    if (Number(currentUserId) !== Number(requestedUserId)) {
      return ctx.unauthorized("You are not authorized to perform this action.");
    }

    ctx.request.body = lodash.pick(ctx.request.body, [
      "firstName",
      "lastName",
      "bio",
      "image",
    ]);

    await next();
  };
};
