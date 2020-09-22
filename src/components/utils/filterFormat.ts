//path: directory
//parent: parent directory if it exists (current implementation locates parent directory using dependencies)
//dependency: filters are dependent on pathways, (if parent exists, there must be corresponding dependency)
//DEPENDENCIES are HIERARCHICAL, once first dependency is located, the second dependency will be looked for in the first
//the innermost dependency contains the parent directory
//prereq: prereq fields before current field can be accessed
//format: determines type of field
//label: default placeholder for field
//priority: whether or not it will be displayed in main filter menu or more filters menu

export const buyFilterFormat = [
  {
    path: "make",
    parent: "",
    dependency: {
      exist: false,
      optional: false,
      dependency: [],
    },
    prereq: {
      exist: false,
      optional: false,
      prereq: [],
    },
    format: "dropdown",
    label: "Make",
    priority: true,
  },
  {
    path: "model",
    parent: "models",
    dependency: {
      exist: true,
      optional: false,
      dependency: ["make"],
    },
    prereq: {
      exist: true,
      optional: false,
      prereq: ["make"],
    },
    format: "dropdown",
    label: "Model",
    priority: true,
  },
  {
    path: "modelYear",
    parent: "modelYears",
    dependency: {
      exist: true,
      optional: true,
      dependency: ["make", "models model"],
    },
    prereq: {
      exist: true,
      optional: true,
      prereq: ["make", "model"],
    },
    format: "dropdown",
    label: "Year",
    priority: false,
  },
  {
    path: "type",
    parent: "types",
    dependency: {
      exist: true,
      optional: true,
      dependency: ["make", "models model"],
    },
    prereq: {
      exist: true,
      optional: true,
      prereq: ["make", "model"],
    },
    format: "dropdown",
    label: "Style",
    priority: false,
  },
  {
    path: "transmission",
    parent: "transmissions",
    dependency: {
      exist: true,
      optional: true,
      dependency: ["make", "models model"],
    },
    prereq: {
      exist: true,
      optional: true,
      prereq: ["make", "model"],
    },
    format: "dropdown",
    label: "Transmission",
    priority: false,
  },
  {
    path: "mileage",
    parent: "",
    dependency: {
      exist: false,
      optional: false,
      dependency: [],
    },
    prereq: {
      exist: false,
      optional: false,
      prereq: [],
    },
    format: "input number 2",
    content: [0, 1000000],
    contentPlaceholder: ["minimum", "maximum"],
    contentLabel: "Between ,KM and ,KM",
    label: "Mileage",
    priority: true,
  },
  {
    path: "price",
    parent: "0,100000000",
    dependency: {
      exist: false,
      optional: false,
      dependency: [],
    },
    prereq: {
      exist: false,
      optional: false,
      prereq: [],
    },
    format: "input number 2",
    content: [0, 1000000000],
    contentPlaceholder: ["minimum", "maximum"],
    contentLabel: "Between $, and $",
    label: "Price",
    priority: true,
  },
  {
    path: "wheelDrive",
    parent: "wheelDrives",
    dependency: {
      exist: true,
      optional: true,
      dependency: ["make", "models model"],
    },
    prereq: {
      exist: true,
      optional: true,
      prereq: ["make", "model"],
    },
    format: "dropdown",
    label: "Wheel Drive",
    priority: false,
  },
  {
    path: "seat",
    parent: "seats",
    dependency: {
      exist: true,
      optional: true,
      dependency: ["make", "models model"],
    },
    prereq: {
      exist: true,
      optional: true,
      prereq: ["make", "model"],
    },
    format: "dropdown",
    label: "Seats",
    priority: false,
  },
];
