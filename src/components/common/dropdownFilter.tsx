import * as React from "react";

export interface DropdownFilterProps {
  format: any; //format to dynamically access database
  database: any; //database used to draw info from
  defaultDatabase: any; //for filters with optional prereqs, a default db is used when prereqs not met
  filters: any; //currently active filters
  onSelect: (data: string, filter: string) => boolean;
}

export interface DropdownFilterState {}

class DropdownFilter extends React.Component<
  DropdownFilterProps,
  DropdownFilterState
> {
  validatePrereq = () => {
    //makes sure prereqs are met, so dropdown can be accessed
    const { format, filters } = this.props;

    if (
      !format.prereq.exist ||
      (format.prereq.exist && format.prereq.optional)
    ) {
      //if prereqs don't exist or if prereqs exist but are optional

      return true;
    }

    const prereqMet = format.prereq.prereq.filter(
      (prereq: string) => filters[prereq] === ""
    );
    // checks if prereqs are empty strings, aka not met

    if (prereqMet.length > 0) {
      //if >0, not all prereqs are met
      return false;
    }

    //if =0
    return true;
  };

  validateDependency = (dependency: string[]) => {
    //checks if all dependencies are met
    const { filters } = this.props;
    for (let count = 0; count < dependency.length; count++) {
      if (dependency[count].split(" ").length === 1) {
        if (
          filters[dependency[count]] === "" ||
          filters[dependency[count]] === undefined
        ) {
          return false;
        }
      } else if (dependency[count].split(" ").length === 2) {
        const directory = dependency[count].split(" ");
        if (
          filters[directory[1]] === "" ||
          filters[directory[1]] === undefined
        ) {
          return false;
        }
      }
    }
    return true;
  };

  locateDirectory = (dependency: string[]) => {
    //essentially locates the directory that the inner dependency is located in
    //dependency order matters, the first dependency will be searched, then the second within the first
    //messy and hard to understand, unfortunately made to be compatible with current implementation
    //look for more concise and intricate system in the future
    const { filters, database } = this.props;
    let targetDatabase = database;
    for (let count = 0; count < dependency.length; count++) {
      if (dependency[count].split(" ").length === 1) {
        targetDatabase = targetDatabase.find(
          (database: any) =>
            database[dependency[count]] === filters[dependency[count]]
        );
      } else if (dependency[count].split(" ").length === 2) {
        const directory = dependency[count].split(" ");
        targetDatabase = targetDatabase[directory[0]].find(
          (database: any) => database[directory[1]] === filters[directory[1]]
        );
      }
    }
    return targetDatabase;
  };

  renderPrimary = () => {
    //renders selected option
    const { format, filters } = this.props;

    let dropdownPrimary: any = "";
    let visual: string = "";

    if (filters[format.path] === "") {
      //default option
      dropdownPrimary = format.label;
      visual = "btn btn-light dropdown-toggle";
    } else {
      //non-default option
      dropdownPrimary = filters[format.path];
      visual = "btn btn-dark dropdown-toggle";
    }
    return (
      <button
        className={visual}
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        disabled={!this.validatePrereq()}
      >
        {dropdownPrimary}
      </button>
    );
  };

  renderBody = () => {
    //renders dropdown menu options, if dropdown has no parent (no dependencies)
    const { format, filters, database, onSelect } = this.props;
    let dropdownBody: any = [];

    let newDatabase = database;
    if (filters[format.path] !== "") {
      //if option is already selected (not default option), removes it from dropdown options
      newDatabase = database.filter(
        (entry: any) => entry[format.path] !== filters[format.path]
      );
    }
    if (newDatabase.length > 0) {
      //if there are more options
      newDatabase.map((item: any) =>
        dropdownBody.push(
          <button
            key={item[format.path]}
            className="dropdown-item"
            onClick={() => onSelect(item[format.path], format.path)}
          >
            {item[format.path]}
          </button>
        )
      );
    } else {
      //if no other options are available
      dropdownBody.push(
        <button className="dropdown-item" disabled>
          No other options
        </button>
      );
    }
    return dropdownBody;
  };

  renderBodyWithParent = () => {
    //renders dropdown options, if dropdown has a parent (has dependencies)
    const { format, filters, defaultDatabase, onSelect } = this.props;

    let dropdownBody: any = [];

    if (
      format.dependency.exist &&
      format.dependency.optional &&
      !this.validateDependency(format.dependency.dependency)
    ) {
      //if dropdown has optional dependencies, but they are not all met
      //draws data from default database
      let newDatabase = defaultDatabase[format.path];
      if (filters[format.path] !== "") {
        //if option is already selected (not default option), removes it from dropdown options
        newDatabase = defaultDatabase[format.path].filter(
          (entry: any) => entry !== filters[format.path]
        );
      }
      if (newDatabase.length > 0) {
        //if there are more options
        newDatabase.map((item: any) =>
          dropdownBody.push(
            <button
              key={item}
              className="dropdown-item"
              onClick={() => onSelect(item, format.path)}
            >
              {item}
            </button>
          )
        );
      } else {
        //if no other options are available
        dropdownBody.push(
          <button className="dropdown-item" disabled>
            No other options
          </button>
        );
      }
    } else if (
      format.dependency.exist &&
      !format.dependency.optional &&
      !this.validateDependency(format.dependency.dependency)
    ) {
      //if non-optional dependency exist and its not met
      //in these cases, they will always have prereqs that are not met either, so dropdown will be disabled
      //however, a button is added to the dropdown anyway to prevent any errors
      return (
        <button className="dropdown-item" disabled>
          Dependency not met
        </button>
      );
    } else {
      //if dependencies are met
      let targetDatabase = this.locateDirectory(format.dependency.dependency);
      let newDatabase = targetDatabase[format.parent];
      if (filters[format.path] !== "") {
        newDatabase = targetDatabase[format.parent].filter(
          (entry: any) => entry[format.path] !== filters[format.path]
        );
      }
      if (newDatabase.length > 0) {
        newDatabase.map((item: any) =>
          dropdownBody.push(
            <button
              key={item[format.path]}
              className="dropdown-item"
              onClick={() => onSelect(item[format.path], format.path)}
            >
              {item[format.path]}
            </button>
          )
        );
      } else {
        dropdownBody.push(
          <button className="dropdown-item" disabled>
            No other options
          </button>
        );
      }
    }
    return dropdownBody;
  };

  render() {
    const { format } = this.props;

    if (format.format !== "dropdown") {
      //checks that it is dropdown
      alert(format.path + "is not a dropdown");
    }

    return (
      <div className="dropdown">
        {this.renderPrimary()}
        <div className="dropdown-menu">
          {format.parent === ""
            ? this.renderBody()
            : this.renderBodyWithParent()}
        </div>
      </div>
    );
  }
}

export default DropdownFilter;
