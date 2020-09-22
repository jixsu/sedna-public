//this database is used for the search bar
//it is implemented with the search algorithm
//any changes here will also call for changes in search algorithm
//it includes all existing cars in the database
//IMPORTANT: a function should be implemented to add entries once adding cars to database from user end is implemented

const carDatabase = {
  make: [
    "Nissan",
    "Mercedes-Benz",
    "Audi",
    "McLaren",
    "Porsche",
    "Lamborghini",
    "Honda",
    "Subaru",
    "Dodge",
    "Lexus",
  ],
  model: [
    "LC500",
    "Civic",
    "R8",
    "AMG GT 63S 4-Door",
    "720S",
    "GTR Nismo",
    "P1",
    "918 Sypder",
    "Aventador SVJ",
    "Viper SRT",
    "370Z",
    "BRZ",
    "AMG GT-R",
    "AMG E63S",
    "RS7",
    "Skyline GT-R",
  ],
  type: ["Coupe", "Sedan", "Supercar", "Luxury", "Convertible"],
  transmission: ["Manual", "Automatic"],
};

export function getCarDatabase() {
  return carDatabase;
}

export function getCarDatabaseLowerCase() {
  let newDatabase = carDatabase;
  for (let count = 0; count < newDatabase.make.length; count++) {
    newDatabase.make[count] = newDatabase.make[count].toLowerCase();
  }
  for (let count = 0; count < newDatabase.model.length; count++) {
    newDatabase.model[count] = newDatabase.model[count].toLowerCase();
  }
  for (let count = 0; count < newDatabase.type.length; count++) {
    newDatabase.type[count] = newDatabase.type[count].toLowerCase();
  }
  for (let count = 0; count < newDatabase.transmission.length; count++) {
    newDatabase.transmission[count] = newDatabase.transmission[
      count
    ].toLowerCase();
  }
  return newDatabase;
}
