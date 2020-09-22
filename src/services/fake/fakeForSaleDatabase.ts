//this database is used to keep track of existing cars for sale in database
//IMPORTANT: currently cut down (as it is unnecessary for development purposes to include all in fake database)
//this database is used for filtering purposes
//it is kept separate from the search database
//because using this for the search algorithm would make the algorithm a bit unnecessarily more complicated

export interface ForSaleMakeEntry {
  make: string;
  models: ModelEntry[];
}

interface ModelEntry {
  model: string;
  modelYears: ModelYearEntry[];
  types: TypeEntry[];
  transmissions: TransmissionEntry[];
  seats: SeatEntry[];
  wheelDrives: WheelDriveEntry[];
}

interface ModelYearEntry {
  modelYear: number;
}

interface TypeEntry {
  type: string;
}

interface TransmissionEntry {
  transmission: string;
}

interface SeatEntry {
  seat: number;
}

interface WheelDriveEntry {
  wheelDrive: string;
}

const forSaleDatabase: ForSaleMakeEntry[] = [
  {
    make: "Honda",
    models: [
      {
        model: "Civic",
        modelYears: [{ modelYear: 2015 }],
        types: [{ type: "Sedan" }],
        transmissions: [{ transmission: "Manual" }],
        seats: [{ seat: 5 }],
        wheelDrives: [{ wheelDrive: "RWD" }],
      },
    ],
  },
  {
    make: "Audi",
    models: [
      {
        model: "R8",
        modelYears: [{ modelYear: 2020 }],
        types: [{ type: "Coupe" }, { type: "Supercar" }],
        transmissions: [{ transmission: "Automatic" }],
        seats: [{ seat: 2 }],
        wheelDrives: [{ wheelDrive: "AWD" }],
      },
    ],
  },
];

export const defaultForSaleDatabase = {
  modelYear: [
    2000,
    2001,
    2002,
    2003,
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
  ],
  type: ["Sedan", "Coupe", "Luxury", "Convertible", "Supercar"],
  transmission: ["Automatic", "Manual"],
  wheelDrive: ["AWD", "RWD", "FWD", "4WD"],
  seat: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export function getForSaleDatabase() {
  return forSaleDatabase;
}
