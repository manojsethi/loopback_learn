/* eslint-disable camelcase */
"use strict";

module.exports = function (Car) {
  Car.observe("before save", function (ctx, next) {
    if (ctx.instance && !ctx.instance.code) {
      var randomCode = generateRandomCode();
      ctx.instance.code = randomCode;
    }
    next();
  });

  function generateRandomCode() {
    let crypto = require("crypto");
    const randomCode = crypto.randomBytes(6).toString("hex");
    return randomCode;
  }

  Car.loadCompatibleTires = function (carId, cb) {
    Car.findById(carId, function (err, car) {
      if (err) return cb(err);
      if (!car) {
        var error = new Error("Car not found");
        error.statusCode = 404;
        return cb(error);
      }

      Car.app.models.Tyre.find(
        {
          where: {
            size: car.tyre_size,
          },
          include: "brand", // Include the 'brand' relation
        },
        function (err, compatibleTires) {
          if (err) return cb(err);
          const transformedData = compatibleTires.map((tire) => ({
            model: tire.model,
            size: tire.size,
            id: tire.id,
            brand: {
              name: tire.brand().name,
              type: tire.brand().type,
              code: tire.brand().code,
              id: tire.brand().id,
            },
          }));

          cb(null, transformedData);
        }
      );
    });
  };

  Car.remoteMethod("loadCompatibleTires", {
    http: {
      verb: "get",
      path: "/loadCompatibleTires",
    },
    accepts: {
      arg: "carId",
      type: "string",
      required: true,
    },
    returns: {
      arg: "compatibleTires",
      type: "array",
    },
  });
};
