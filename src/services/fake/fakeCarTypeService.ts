import Coupe from "../../assets/images/Subaru_BRZ.png";
import Sedan from "../../assets/images/Tesla_Model_S.png";
import Luxury from "../../assets/images/Mercedes-Benz_Maybach.png";
import Supercar from "../../assets/images/McLaren_P1.png";
import Convertible from "../../assets/images/Porsche_Boxster.png";

const carTypes = [
  {
    _id: "23f242c0-993c-48b9-9db3-3fe6710f7bd9",
    name: "Coupe",
    img: Coupe,
  },
  {
    _id: "efd0991c-74c9-4e26-85ca-840e1ce6d9f0",
    name: "Sedan",
    img: Sedan,
  },
  {
    _id: "72ab0ce3-a936-4bc9-b9ab-23d6940188a6",
    name: "Luxury",
    img: Luxury,
  },
  {
    _id: "6cb942ad-0ea6-485a-b98a-94274bfdd6d3",
    name: "Supercar",
    img: Supercar,
  },
  {
    _id: "a42811ac-7d25-42b7-9d93-ac77aa39a718",
    name: "Convertible",
    img: Convertible,
  },
];

export interface Type {
  _id: string;
  name: string;
  img?: string;
}

export function getCarTypes() {
  return carTypes;
}
