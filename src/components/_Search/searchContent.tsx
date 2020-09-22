import * as React from "react";
import ProductBox, { ContentFormat } from "../common/productBox";
import FilterMenu from "../common/filterMenu";
import { onApplyForSaleFilters } from "../utils/filtering";
import { buyFilterFormat } from "../utils/filterFormat";
import {
  getForSaleDatabase,
  defaultForSaleDatabase,
} from "../../services/fake/fakeForSaleDatabase";
import { Link } from "react-router-dom";

export interface SearchContentProps {
  match: any;
  content: any;
  contentFormat: ContentFormat;
}

export interface SearchContentState {
  filterActive: boolean;
  filteredContent: any;
  filterDatabase: any;
}

class SearchContent extends React.Component<
  SearchContentProps,
  SearchContentState
> {
  state = {
    filterActive: false,
    filteredContent: [],
    filterDatabase: [],
  };

  componentDidMount() {
    const filterDatabase = getForSaleDatabase();
    this.setState({ filterDatabase });
  }

  renderSearchResults = (content: any, contentFormat: ContentFormat) => {
    return content.map((c: any) => {
      return (
        <ProductBox key={c._id} content={c} contentFormat={contentFormat} />
      );
    });
  };

  renderFilterMenu = () => {
    const { content } = this.props;
    const { filterDatabase } = this.state;

    let filterMenu: any = null;

    filterMenu = (
      <FilterMenu
        filterFormat={buyFilterFormat}
        defaultDatabase={defaultForSaleDatabase}
        database={filterDatabase}
        data={content}
        onApply={this.handleApplyClick}
        onClear={this.handleClearClick}
      />
    );

    return filterMenu;
  };

  renderContent = () => {
    const { match, content, contentFormat } = this.props;
    const { filterActive, filteredContent } = this.state;

    const results = content.length === 0 ? false : true;

    let finalContent: any = [];

    if (filterActive) {
      finalContent = filteredContent;
    } else {
      finalContent = content;
    }

    return (
      <React.Fragment>
        {!results && this.renderNoResults()}
        {results && (
          <div>
            <div className="container-fluid m-4">
              <p style={{ fontSize: "30px" }}>
                Search Results For: {match.params.query}
              </p>
            </div>
            <div>{this.renderFilterMenu()}</div>
            <div className="container-fluid">
              {finalContent.length !== 0
                ? this.renderSearchResults(finalContent, contentFormat)
                : this.renderEmpty("cars")}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  };

  renderNoResults = () => {
    const { match } = this.props;
    return (
      <div className="m-3" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "30px" }}>
          We didn't find a match for {match.params.query}
        </p>
        <p style={{ fontSize: "15px" }}>Try searching for something else!</p>
        {
          <Link className="btn btn-dark" to="/buy">
            View All Cars For Sale
          </Link>
        }
      </div>
    );
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

    const filteredContent = onApplyForSaleFilters(filters, data);
    this.setState({ filteredContent });
  };

  handleClearClick = () => {
    this.setState({ filterActive: false });
  };

  render() {
    return this.renderContent();
  }
}

export default SearchContent;
