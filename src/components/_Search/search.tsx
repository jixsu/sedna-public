import React from "react";
import Map from "../common/map";
import SearchContent from "./searchContent";
import { searchAlgorithm } from "../utils/searchAlgorithm";
import { RouteComponentProps, Redirect } from "react-router-dom";
import * as H from "history";

interface MatchParams {
  query: string;
  id: string;
}

interface SearchProps extends RouteComponentProps<MatchParams> {}

class Search extends React.Component<SearchProps> {
  state = {};

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

  forSaleContent = {
    img: { path: "img" },
    title: { path: ["modelYear", "make", "model"] },
    price: { path: "price", label: ["$"] },
    details: {
      path: ["mileage", "transmission", "wheelDrive"],
      label: ["", "km", "", "", "", ""],
    },
  };

  render() {
    const { match } = this.props;

    if (match.params.id !== "buy") return <Redirect to="/buy" />; //if user accesses search without buy

    const carsBySearch = searchAlgorithm(match.params.query, match.params.id);

    const results = carsBySearch.length === 0 ? false : true;

    return (
      <React.Fragment>
        {results && <Map mapData={this.mapData} />}

        <SearchContent
          match={match}
          content={carsBySearch}
          contentFormat={this.forSaleContent}
        />
      </React.Fragment>
    );
  }
}

export default Search;
