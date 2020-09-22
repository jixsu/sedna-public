import * as React from "react";
import { Popup } from "semantic-ui-react";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export interface InputFilterProps {
  format: any;
  database: any;
  filters: any;
  onClear: (filter: any) => void;
  onSave: (filter: any, input: any) => void;
}

export interface InputFilterState {
  input: any;
}

class InputFilter extends React.Component<InputFilterProps, InputFilterState> {
  state = {
    input: {},
  };

  componentDidMount() {
    this.initializeInputState();
  }

  initializeInputState = () => {
    const { format } = this.props;
    const numInputs = format.content.length;

    let input: any = {};

    for (let count = 0; count < numInputs; count++) {
      input[count.toString()] = "";
    }

    this.setState({ input });
  };

  handleChange = (query: string, id: string) => {
    let input: any = this.state.input;
    input[id] = query;
    this.setState({ input });
    return null;
  };

  handleClear = () => {
    const { onClear, format } = this.props;
    this.initializeInputState();
    onClear(format.path);
  };

  handleSave = () => {
    const { onSave, format } = this.props;
    const { input } = this.state;
    const numInputs = format.content.length;

    let inputArray = [];
    const activeInput: any = input;

    for (let count = 0; count < numInputs; count++) {
      if (activeInput[count.toString()] === "") {
        activeInput[count.toString()] = "empty";
      }
      inputArray.push(activeInput[count.toString()]);
    }

    let inputToString = inputArray.toString();

    onSave(format.path, inputToString);
  };

  renderContent = () => {
    const { format } = this.props;
    let content: any[] = [];
    const contentLabel = format.contentLabel.split(",");
    for (let repeats = 0; repeats < format.content.length / 2; repeats++) {
      for (let count = 0; count < 2; count++) {
        content.push(<p>{contentLabel[count + repeats * 3]}</p>);
        const id = (count + repeats * 2).toString();
        content.push(
          <input
            id={id}
            onChange={(e) => this.handleChange(e.currentTarget.value, id)}
            className="form-control"
            type="text"
            placeholder={format.contentPlaceholder[count + repeats * 2]}
          ></input>
        );
      }
      content.push(<p>{contentLabel[repeats * 3 + 2]}</p>);
    }

    return content;
  };

  renderButtonAppearance = () => {
    //if filter is selected
    const { filters, format } = this.props;
    if (filters[format.path] === "") {
      return "btn btn-light dropdown-toggle";
    } else {
      return "btn btn-dark dropdown-toggle";
    }
  };

  render() {
    const { format } = this.props;
    return (
      <div className="dropdown">
        <Popup
          trigger={
            <button className={this.renderButtonAppearance()}>
              {format.label}
            </button>
          }
          position="bottom center"
          on="click"
          basic
          onClose={() => this.initializeInputState()}
        >
          <div className="content">{this.renderContent()}</div>
          <button
            className="btn btn-light"
            style={{ textDecoration: "underline" }}
            onClick={() => this.handleClear()}
          >
            Clear
          </button>
          <button className="btn btn-dark" onClick={() => this.handleSave()}>
            Save
          </button>
        </Popup>
      </div>
    );
  }
}

export default InputFilter;
