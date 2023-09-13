"use strict";

module.exports = function (app) {
  const Brand = app.models.Brand;

  const demoBrands = [
    {
      name: "BMW",
      type: "Car",
    },
    {
      name: "Mercedes",
      type: "Car",
    },
    {
      name: "Audi",
      type: "Car",
    },
    {
      name: "Maruti",
      type: "Car",
    },
    {
      name: "Ceat",
      type: "Tyre",
    },
    {
      name: "Apollo",
      type: "Tyre",
    },
    {
      name: "Good Year",
      type: "Tyre",
    },
    {
      name: "MRF",
      type: "Tyre",
    },
  ];

  Brand.create(demoBrands, (err, brands) => {
    if (err) throw err;

    console.log("Demo brands created:", brands);
  });
};
