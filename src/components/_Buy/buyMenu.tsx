import * as React from "react";
import HorizontalList from "../common/horizontalList";
import FilterMenu from "../common/filterMenu";
import FastNav from "../common/fastnav";
import { ForSale } from "../../services/fake/fakeForSaleService";
import { Type } from "../../services/fake/fakeCarTypeService";
import { buyFilterFormat } from "../utils/filterFormat";
import { defaultForSaleDatabase } from "../../services/fake/fakeForSaleDatabase";
import { onApplyForSaleFilters } from "../utils/filtering";
import { ForSaleMakeEntry } from "./../../services/fake/fakeForSaleDatabase";

export interface BuyMenuProps {
  forSales: ForSale[];
  types: Type[];
  filterDatabase: ForSaleMakeEntry[];
}

export interface BuyMenuState {
  filterActive: boolean;
  filteredForSales: ForSale[];
}

class BuyMenu extends React.Component<BuyMenuProps, BuyMenuState> {
  state = {
    filterActive: false,
    filteredForSales: [],
  };

  forSaleContent = {
    img: { path: "img" },
    title: { path: ["modelYear", "make", "model"] },
    price: { path: "price", label: ["$"] },
    details: {
      path: ["mileage", "transmission", "wheelDrive"],
      label: ["", "km", "", "", "", ""],
    },
  };

  renderContent = () => {
    const { forSales } = this.props;
    const { filterActive, filteredForSales } = this.state;

    let finalForSales: ForSale[] = [];

    if (filterActive) {
      finalForSales = filteredForSales;
    } else {
      finalForSales = forSales;
    }

    return finalForSales.length === 0
      ? this.renderEmpty("forSales")
      : this.renderForSaleLists(finalForSales);
  };

  renderForSaleLists = (cars: ForSale[]) => {
    const activeTypes: Type[] = [];
    cars.forEach((car: ForSale) => {
      car.types.forEach((type) => {
        if (activeTypes.some((activeType) => activeType._id === type._id)) {
        } else {
          activeTypes.push(type);
        }
      });
    });
    return activeTypes.map((type) => {
      const carsByType: ForSale[] = [];
      cars.forEach((car: ForSale) => {
        if (car.types.some((t) => t._id === type._id)) {
          carsByType.push(car);
        }
      });

      return (
        <HorizontalList
          key={type._id}
          category={type}
          contents={carsByType}
          contentFormat={this.forSaleContent}
        />
      );
    });
  };

  renderEmpty = (text: string) => {
    return (
      <div className="m-3" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "20px" }}>No {text} could be found :(</p>
      </div>
    );
  };

  handleApplyClick = (filters: any, data: any) => {
    if (this.state.filterActive === false) {
      this.setState({ filterActive: true });
    }

    const filteredForSales = onApplyForSaleFilters(filters, data);
    this.setState({ filteredForSales });
  };

  handleClearClick = () => {
    this.setState({ filterActive: false });
  };

  render() {
    const { forSales, types, filterDatabase } = this.props;

    return (
      <div>
        <div>
          <FastNav types={types} />
        </div>
        <div
          style={{
            borderBottom: "1px solid darkgrey",
            width: "95%",
            margin: "auto",
          }}
        />
        <div>
          <FilterMenu
            filterFormat={buyFilterFormat}
            defaultDatabase={defaultForSaleDatabase}
            data={forSales}
            database={filterDatabase}
            onApply={this.handleApplyClick}
            onClear={this.handleClearClick}
          />
        </div>
        <div id="home content">{this.renderContent()}</div>
      </div>
    );
  }
}

export default BuyMenu;
