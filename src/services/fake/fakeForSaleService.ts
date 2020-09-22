import { Type } from "./fakeCarTypeService";

const forSales = [
  {
    img: [
      "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
    ],
    _id: "e75297b4-ba7f-4097-9e26-f0581bee0d1b",
    make: "Honda",
    model: "Civic",
    modelYear: 2015,
    types: [
      {
        _id: "efd0991c-74c9-4e26-85ca-840e1ce6d9f0",
        name: "Sedan",
      },
    ],
    transmission: "Manual",
    mileage: 10000,
    price: [10000],
    standardFeatures: [
      "AC",
      "Heating",
      "ABS",
      "Traction Control",
      "Stability Control",
    ],
    additionalFeatures: ["360 Degree Camera", "Apple CarPlay", "Heated Seats"],
    description: "No collisions, new all-seasons tires",
    wheelDrive: "RWD",
    seats: 5,
  },
  {
    img: [
      "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
      "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
    ],
    _id: "d94b0550-20f3-4bf0-8739-20f30de3c1f6",
    make: "Audi",
    model: "R8",
    modelYear: 2020,
    types: [
      {
        _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
        name: "Coupe",
      },
      {
        _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
        name: "Supercar",
      },
    ],
    transmission: "Automatic",
    mileage: 2000,
    price: [190000],
    standardFeatures: [
      "AC",
      "Heating",
      "ABS",
      "Traction Control",
      "Stability Control",
    ],
    additionalFeatures: [
      "Carbon Fiber Hood",
      "Performance Ceramic Brakes",
      "Race Seats",
    ],
    description: "No collisions, new all-seasons tires",
    wheelDrive: "AWD",
    seats: 2,
  },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "5299e162-448d-42fb-b564-79bea633ee7f",
  //   make: "Lexus",
  //   model: "LC500",
  //   modelYear: 2018,
  //   types: [
  //     {
  //       _id: "a42811ac-7d25-42b7-9d93-ac77aa39a718",
  //       name: "Convertible",
  //     },
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "72ab0ce3-a936-4bc9-b9ab-23d6940188a6",
  //       name: "Luxury",
  //     },
  //   ],
  //   transmission: "Manual",
  //   mileage: 15000,
  //   price: [100000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: ["360 Degree Camera", "Apple CarPlay", "Heated Seats"],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "AWD",
  //   seats: 4,
  // },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "fd76ad95-ff95-488b-b718-d71e90ec4bff",
  //   make: "Mercedes-Benz",
  //   model: "AMG GT 63S 4-Door Coupe",
  //   modelYear: 2018,
  //   types: [
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "72ab0ce3-a936-4bc9-b9ab-23d6940188a6",
  //       name: "Luxury",
  //     },
  //   ],
  //   transmission: "Automatic",
  //   mileage: 20000,
  //   price: [150000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: ["360 Degree Camera", "Apple CarPlay", "Heated Seats"],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "AWD",
  //   seats: 5,
  // },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "8a7e73f0-0c21-49f5-928d-aab729c09ec5",
  //   make: "McLaren",
  //   model: "720S",
  //   modelYear: 2020,
  //   types: [
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
  //       name: "Supercar",
  //     },
  //   ],
  //   transmission: "Automatic",
  //   mileage: 5000,
  //   price: [300000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: [
  //     "360 Degree Camera",
  //     "Apple CarPlay",
  //     "Heated Seats",
  //     "Track Mode",
  //   ],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "RWD",
  //   seats: 2,
  // },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "2c9becd1-ec85-4450-8feb-60aa8698a491",
  //   make: "Nissan",
  //   model: "GTR Nismo",
  //   modelYear: 2018,
  //   types: [
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
  //       name: "Supercar",
  //     },
  //   ],
  //   transmission: "Automatic",
  //   mileage: 6000,
  //   price: [210000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: [
  //     "360 Degree Camera",
  //     "Apple CarPlay",
  //     "Heated Seats",
  //     "Track Mode",
  //   ],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "AWD",
  //   seats: 2,
  // },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "ff07a002-2bcd-441b-a7d6-d2025ec5793d",
  //   make: "McLaren",
  //   model: "P1",
  //   modelYear: 2015,
  //   types: [
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
  //       name: "Supercar",
  //     },
  //   ],
  //   transmission: "Automatic",
  //   mileage: 1000,
  //   price: [2000000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: [
  //     "360 Degree Camera",
  //     "Apple CarPlay",
  //     "Heated Seats",
  //     "Track Mode",
  //     "Carbon Fibre Wing",
  //   ],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "RWD",
  //   seats: 2,
  // },
  // {
  //   img: [
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_coupe_si_fq_oem_1_815.jpg",
  //     "https://media.ed.edmunds-media.com/honda/civic/2020/oem/2020_honda_civic_4dr-hatchback_type-r_fq_oem_1_815.jpg",
  //   ],
  //   _id: "b09756bd-0e61-4728-bb7a-0e47cb5a747d",
  //   make: "Porsche",
  //   model: "918 Spyder",
  //   modelYear: 2015,
  //   types: [
  //     {
  //       _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
  //       name: "Coupe",
  //     },
  //     {
  //       _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
  //       name: "Supercar",
  //     },
  //   ],
  //   transmission: "Automatic",
  //   mileage: 2000,
  //   price: [1800000],
  //   standardFeatures: [
  //     "AC",
  //     "Heating",
  //     "ABS",
  //     "Traction Control",
  //     "Stability Control",
  //   ],
  //   additionalFeatures: [
  //     "360 Degree Camera",
  //     "Apple CarPlay",
  //     "Heated Seats",
  //     "Track Mode",
  //   ],
  //   description: "No collisions, new all-seasons tires",
  //   wheelDrive: "AWD",
  //   seats: 2,
  // },
];

export interface ForSale {
  img: string[];
  _id: string;
  make: string;
  model: string;
  modelYear: number;
  types: Type[];
  transmission: string;
  mileage: number;
  price: number[];
  standardFeatures: string[];
  additionalFeatures: string[];
  description: string;
  wheelDrive: string;
  seats: number;
}

export function getForSales() {
  return forSales;
}
