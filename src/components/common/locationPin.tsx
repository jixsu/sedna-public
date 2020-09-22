import React from "react";
import { Icon, Popup } from "semantic-ui-react";

interface LocationPinProps {
  _id: string;
  lat: number | undefined;
  lng: number | undefined;
  trueLat: number;
  trueLng: number;
  selected: boolean;
  currentLocation: boolean;
  onClick: (pinId: string) => null;
}

class LocationPin extends React.Component<LocationPinProps> {
  renderProps = () => {
    //determines Icon props
    const { currentLocation, selected } = this.props;

    const props = {} as any;
    if (currentLocation) {
      props.color = "blue";
      props.name = "dot circle outline";
      props.size = "large";
    } else {
      props.name = "map marker alternate";
      props.size = "huge";
      if (selected) props.color = "blue";
      else {
        props.color = "black";
      }
    }
    return props;
  };

  renderIconData = () => {
    const { selected } = this.props;

    const props = this.renderProps();

    if (selected) {
      return (
        <Icon
          link
          name={props.name}
          color={props.color}
          size={props.size}
          onClick={() => this.props.onClick(this.props._id)}
        />
      );
    } else {
      return (
        <Popup
          trigger={
            <Icon
              link
              name={props.name}
              color={props.color}
              size={props.size}
              onClick={() => this.props.onClick(this.props._id)}
            />
          }
          content="I am positioned to the top center"
          position="top center"
        />
      );
    }
  };

  render() {
    const { currentLocation, _id } = this.props;

    return (
      <div className="pin">
        {this.renderIconData()}
        <p>{currentLocation && "You"}</p>
      </div>
    );
  }
}

export default LocationPin;
