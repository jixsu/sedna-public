import React from "react";
import Map from "../common/map";
import BuyMenu from "./buyMenu";
import { getCarTypes, Type } from "../../services/fake/fakeCarTypeService";
import { getForSales, ForSale } from "../../services/fake/fakeForSaleService";
import {
  getForSaleDatabase,
  ForSaleMakeEntry,
} from "../../services/fake/fakeForSaleDatabase";

interface BuyState {
  forSales: ForSale[];
  types: Type[];
  filterDatabase: ForSaleMakeEntry[];
}

class Buy extends React.Component<{}, BuyState> {
  state = {
    forSales: [],
    types: [],
    filterDatabase: [],
  };

  mapData = {
    locationPins: [
      {
        _id: "a8e46453-dc27-480a-b3f4-c3ad2a8b78bb",
        lat: 43.544084,
        lng: -79.656711,
      },
      {
        _id: "add4f34a-921a-4db2-9426-1d316ed38baf",
        lat: 43.577573,
        lng: -79.619353,
      },
    ],
  };

  componentDidMount() {
    const forSales = getForSales();
    const types = getCarTypes();
    const filterDatabase = getForSaleDatabase();
    this.setState({ forSales, types, filterDatabase });
    console.log("Buy Mounted");
  }

  render() {
    const { forSales, types, filterDatabase } = this.state;
    console.log("Buy Rendered");

    return (
      <React.Fragment>
        <Map mapData={this.mapData} />
        <BuyMenu
          forSales={forSales}
          types={types}
          filterDatabase={filterDatabase}
        />
      </React.Fragment>
    );
  }
}

export default Buy;
