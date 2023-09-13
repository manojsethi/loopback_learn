"use strict";

module.exports = function (Brand) {
  Brand.beforeRemote("create", function (ctx, brand, next) {
    if (ctx.args.data && typeof ctx.args.data.code === "undefined") {
      var randomCode = generateRandomCode();
      ctx.args.data.code = randomCode;
    }
    next();
  });
};

function generateRandomCode() {
  const crypto = require("crypto");
  const randomCode = crypto.randomBytes(6).toString("hex");
  return randomCode;
}
