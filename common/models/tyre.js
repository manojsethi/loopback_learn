/* eslint-disable camelcase */
"use strict";

module.exports = function (Tyre) {
  Tyre.getCompatibleCars = function (tyreId, cb) {
    Tyre.findById(tyreId, function (err, tyre) {
      if (err) return cb(err);
      if (!tyre) {
        var error = new Error("Tire not found");
        error.statusCode = 404;
        return cb(error);
      }

      Tyre.app.models.Car.find(
        {
          where: {
            tyre_size: tyre.size,
          },
          include: "brand",
        },
        function (err, compatibleCars) {
          if (err) return cb(err);
          const transformedData = compatibleCars.map((car) => ({
            model: car.model,
            code: car.code,
            tyre_size: car.tyre_size,
            id: car.id,
            brand: {
              name: car.brand().name,
              type: car.brand().type,
              code: car.brand().code,
              id: car.brand().id,
            },
          }));
          cb(null, transformedData);
        }
      );
    });
  };

  Tyre.remoteMethod("getCompatibleCars", {
    http: {
      verb: "get",
      path: "/getCompatibleCars",
    },
    accepts: {
      arg: "tyreId",
      type: "string",
      required: true,
    },
    returns: {
      arg: "compatibleCars",
      type: "array",
    },
  });
};
