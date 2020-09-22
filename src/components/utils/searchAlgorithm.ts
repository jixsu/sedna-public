import { getForSales } from "../../services/fake/fakeForSaleService";
import { getCarTypes, Type } from "../../services/fake/fakeCarTypeService";
import { getCarDatabaseLowerCase } from "../../services/fake/fakeSearchDatabase";

const forSales: any = getForSales();
const types: any = getCarTypes();
const database: any = getCarDatabaseLowerCase();

//weighting of each match found in query
//if weighting > 0, it will be shown

//with the search database, a match will be done to see if:
//an element of query, i.e. Honda, exists in database
//the match will return that a MAKE exists in db that matches element
//however, if the car does not have this match, it will be deducted points
//this way, a more precise search can be returned
//i.e. if user searches 2020 honda coupe,
//a 2020 toyota coupe will not show up
//since the points deducted for not having honda will cause it to have < 0 total points

const weight = {
  car: {
    make: 0.6,
    model: 1.0,
    modelYear: 0.2,
    type: 0.3,
    transmission: 0.4,
  },
};

function matchDatabase(subQuery: string) {
  //if query exists in current database
  //this is so points can be deducted accordingly if a match is found in db
  const matchesArray: string[] = [];
  database.type.forEach(function (type: string) {
    if (type.includes(subQuery)) {
      return matchesArray.push("type");
    }
  });
  database.make.forEach(function (make: string) {
    if (make.includes(subQuery)) {
      return matchesArray.push("make");
    }
  });
  database.model.forEach(function (model: string) {
    if (model.includes(subQuery)) {
      return matchesArray.push("model");
    }
  });
  database.transmission.forEach(function (transmission: string) {
    if (transmission.includes(subQuery)) {
      return matchesArray.push("transmission");
    }
  });
  return matchesArray;
}

export function searchAlgorithm(query: string, id: string) {
  //returns matches
  const adjustedQuery = query.replace(/[\W_]+/g, " ").replace(/\s+/g, " "); //replaces special characters and double spaces
  const searchArray = adjustedQuery.split(" "); //places each word into array
  const cars = forSales;

  const carsByQuery: any[] = [];

  for (const car of cars) {
    //iterates through each car
    let match = 0;

    for (const subQuery of searchArray) {
      //iterates through each word within query for match
      const subQueryEdit = subQuery.toLowerCase();
      const matches = matchDatabase(subQueryEdit);
      if (car.make.toLowerCase().includes(subQueryEdit)) {
        match += weight.car.make;
      } else if (matches.includes("make")) {
        match -= weight.car.make;
      }
      if (car.model.toLowerCase().includes(subQueryEdit)) {
        match += weight.car.model;
      } else if (matches.includes("model")) {
        match -= weight.car.model;
      }
      let typeMatch: string = "pending";
      car.types.forEach(function (type: Type) {
        if (type.name.toLowerCase().includes(subQueryEdit)) {
          typeMatch = "matched";
        } else if (matches.includes("type")) {
          if (typeMatch !== "matched") typeMatch = "unmatched";
        }
      });
      if (typeMatch === "matched") {
        match += weight.car.type;
      } else if (typeMatch === "unmatched") {
        match -= weight.car.type;
      }

      if (car.transmission.toLowerCase().includes(subQueryEdit)) {
        match += weight.car.transmission;
      } else if (matches.includes("transmission")) {
        match -= weight.car.transmission;
      }
      if (parseInt(subQuery, 10) > 1900 && parseInt(subQuery, 10) < 2030) {
        if (parseInt(subQuery) === car.modelYear) {
          match += weight.car.modelYear;
        } else {
          match -= weight.car.modelYear;
        }
      }
    }
    if (match > 0) {
      //if total points > 0, it will be shown
      carsByQuery.push({ match: match, car: car });
    }
  }
  let carsSorted: any[] = carsByQuery;
  carsSorted.sort((a, b) => (a.match >= b.match ? -1 : 1)); //sorts by highest to lowest points

  let refinedCars: any[] = [];

  carsSorted.forEach(function (car) {
    refinedCars.push(car.car);
  });

  return refinedCars;
}
