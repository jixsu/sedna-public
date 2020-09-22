import * as React from "react";
import DropdownFilter from "./dropdownFilter";
import InputFilter from "./inputFilter";
import _ from "lodash";
import "../../css/filterMenu.css";

export interface FilterMenuProps {
  filterFormat: any;
  database: any;
  defaultDatabase: any;
  data: any;
  onApply: (filters: any, data: any) => void;
  onClear: () => void;
}

export interface FilterMenuState {
  filters: any;
  moreFilters: boolean;
}

class FilterMenu extends React.Component<FilterMenuProps, FilterMenuState> {
  state = {
    filters: {},
    moreFilters: false,
  };

  componentDidMount() {
    const { filterFormat } = this.props;
    this.initializeFilters(filterFormat);
    // console.log("Filter Menu Mounted");
  }

  initializeFilters = (format: any) => {
    //dynamically sets all filters to ""
    const filters: any = {};
    format.map((f: any) => (filters[f.path] = ""));
    this.setState({ filters });
  };

  renderPriorityFilters = () => {
    const { filterFormat, database, defaultDatabase } = this.props;
    const { filters } = this.state;

    const priorityFilters = filterFormat.filter(
      (filter: any) => filter.priority === true
    );

    return priorityFilters.map((filter: any) => {
      if (filter.format === "dropdown") {
        return (
          <DropdownFilter
            format={filter}
            database={database}
            defaultDatabase={defaultDatabase}
            filters={filters}
            onSelect={this.handleDropdownSelect}
          />
        );
      } else if (filter.format.includes("input")) {
        return (
          <InputFilter
            format={filter}
            database={database}
            filters={filters}
            onClear={this.handleInputClear}
            onSave={this.handleInputSave}
          />
        );
      }
    });
  };

  renderMoreFilters = () => {
    const { filterFormat, database, defaultDatabase } = this.props;
    const { filters } = this.state;

    const moreFilters = filterFormat.filter(
      (filter: any) => filter.priority !== true
    );

    return moreFilters.map((filter: any) => {
      if (filter.format === "dropdown") {
        return (
          <DropdownFilter
            key={filter.path}
            format={filter}
            database={database}
            defaultDatabase={defaultDatabase}
            filters={filters}
            onSelect={this.handleDropdownSelect}
          />
        );
      } else if (filter.format.includes("input")) {
        return (
          <InputFilter
            key={filter.path}
            format={filter}
            database={database}
            filters={filters}
            onClear={this.handleInputClear}
            onSave={this.handleInputSave}
          />
        );
      }
    });
  };

  renderMoreButtonAppearance = (filters: any) => {
    //if one of the more filters is active, more filters button  will be darkened
    const { filterFormat } = this.props;

    const moreFilters = filterFormat.filter(
      (filter: any) => filter.priority !== true
    );

    let active: boolean = false;

    for (let count = 0; count < moreFilters.length; count++) {
      const path = moreFilters[count].path;
      if (filters[path] !== "") {
        return "btn btn-dark dropdown-toggle";
      } else {
        return "btn btn-light dropdown-toggle";
      }
    }
  };

  handleMoreClick = () => {
    const moreFilters = !this.state.moreFilters;
    this.setState({ moreFilters });
  };

  handleDropdownSelect = (data: string, filter: string) => {
    const { filters } = this.state;
    let newFilters: any = filters;
    newFilters[filter] = data;
    this.setState({ filters: newFilters });
    return true;
  };

  handleInputSave = (filter: any, input: any) => {
    const { filters } = this.state;
    let newFilters: any = filters;
    newFilters[filter] = input;
    this.setState({ filters: newFilters });
  };

  handleInputClear = (filter: any) => {
    const { filters } = this.state;
    let newFilters: any = filters;
    newFilters[filter] = "";
    this.setState({ filters: newFilters });
  };

  handleClearFilters = (filterFormat: any) => {
    const { onClear } = this.props;
    this.initializeFilters(filterFormat);
    onClear();
  };

  showControlButtons = (filters: any) => {
    //shows clear all and apply when a >0 filters are selected
    let disable = false;
    for (let filter in filters) {
      if (filters[filter] !== "") {
        disable = true;
      }
    }
    return disable;
  };

  render() {
    const { filterFormat, onApply, data } = this.props;
    const { filters, moreFilters } = this.state;

    return (
      <div className="container-fluid">
        <div className="m-4 priority-filters">
          {this.renderPriorityFilters()}
          <button
            className={this.renderMoreButtonAppearance(filters)}
            onClick={this.handleMoreClick}
          >
            More Filters
          </button>
          {this.showControlButtons(filters) && (
            <div className="control">
              <button
                className="btn btn-light clear"
                onClick={() => this.handleClearFilters(filterFormat)}
              >
                Clear All
              </button>
              <button
                className="btn btn-dark apply"
                onClick={() => onApply(filters, data)}
              >
                Apply
              </button>
            </div>
          )}
        </div>
        {moreFilters && (
          <div className="m-3 p-3 more-filters">{this.renderMoreFilters()}</div>
        )}
      </div>
    );
  }
}

export default FilterMenu;
