import { getCarTypes } from "./../../services/fake/fakeCarTypeService";
import { ForSale } from "./../../services/fake/fakeForSaleService";

var isSubset = require("is-subset");

const types = getCarTypes();

export function mapDropdownFormatToForSaleFormat(filters: any) {
  const mappedFilters: any = {};

  if (filters.make !== "") mappedFilters.make = filters.make;
  if (filters.model !== "") mappedFilters.model = filters.model;
  if (filters.modelYear !== "")
    mappedFilters.modelYear = parseInt(filters.modelYear, 10);
  if (filters.transmission !== "")
    mappedFilters.transmission = filters.transmission;
  if (filters.wheelDrive !== "") mappedFilters.wheelDrive = filters.wheelDrive;

  if (filters.seat !== "") mappedFilters.seats = parseInt(filters.seat, 10);

  if (filters.type !== "") {
    mappedFilters.types = [];
    const index = types.findIndex((type: any) => type.name === filters.type);
    if (index === -1) return alert("no index of type found");
    mappedFilters.types.push(types[index]);
  }

  return mappedFilters;
}

export function mapInputFormatToForSaleFormat(filters: any) {
  const mappedFilters: any = {};
  if (filters.price !== "") {
    const priceArray = filters.rate.split(",");
    const numberArray = priceArray.map((element: string) => {
      if (element === "empty") {
        return NaN;
      } else {
        return parseFloat(element);
      }
    });

    mappedFilters.rate = numberArray;
  }
  if (filters.mileage !== "") {
    const mileageArray = filters.mileage.split(",");
    const numberArray = mileageArray.map((element: string) =>
      parseFloat(element)
    );
    mappedFilters.mileage = numberArray;
  }
  return mappedFilters;
}

export function onApplyForSaleFilters(filters: any, forSales: ForSale[]) {
  const dropdownFilters = mapDropdownFormatToForSaleFormat(filters);
  const inputFilters = mapInputFormatToForSaleFormat(filters);
  console.log(inputFilters);

  const dropdownFilteredForSales = forSales.filter((forSale: ForSale) =>
    isSubset(forSale, dropdownFilters)
  );

  const inputFilteredForSales = dropdownFilteredForSales.filter(
    (forSale: ForSale) => {
      let match = true;
      if (inputFilters.price !== undefined) {
        if (
          !(
            (isNaN(inputFilters.price[0]) ||
              inputFilters.price[0] <= forSale.price[0]) &&
            (isNaN(inputFilters.price[1]) ||
              inputFilters.price[1] >= forSale.price[0])
          )
        ) {
          match = false;
        }
      }
      if (inputFilters.mileage !== undefined) {
        if (
          !(
            (isNaN(inputFilters.mileage[0]) ||
              forSale.mileage > inputFilters.mileage[0]) &&
            (isNaN(inputFilters.mileage[1]) ||
              forSale.mileage < inputFilters.mileage[1])
          )
        ) {
          match = false;
        }
      }
      return match;
    }
  );

  const filteredForSales = inputFilteredForSales;

  return filteredForSales;
}
