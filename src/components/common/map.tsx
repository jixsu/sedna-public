//Google-map-react library comes with clean UI, but some issues:
//since custom icons are used instead of default google maps pins,
//icons are placed by its top left corner, therefore not centered
//the Icon offset must be accomodated for

import React from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import LocationPin from "./locationPin";
import { calculateIconOffset } from "../utils/calculateIconOffset";
import "../../css/map.css";
import { toast } from "react-toastify";

type LocationDetails = {
  _id: string;
  lat: number;
  lng: number;
  latOffset?: number;
  lngOffset?: number;
};

interface MapProps {
  mapData: {
    locationPins: LocationDetails[];
  };
}

interface MapState {
  currentLocation: LocationDetails;
  zoom: number;
  center: {
    lat: number;
    lng: number;
  };
  selectedPin: LocationDetails;
}

class Map extends React.Component<MapProps, MapState> {
  state = {
    currentLocation: {
      _id: "currentLocation",
      lat: 0,
      lng: 0,
      latOffset: 0,
      lngOffset: 0,
    },
    zoom: 10,
    center: {
      lat: 0,
      lng: 0,
    },
    selectedPin: {
      _id: "",
      lat: 0,
      lng: 0,
      latOffset: 0,
      lngOffset: 0,
    },
  };

  defaultLocation = {
    lat: 37.42216,
    lng: -122.08427,
  };

  componentDidMount() {
    this.getCurrentLocation();
    // console.log("Map Mounted");
  }

  // onChildMouseEnter = (key, childProps) => {
  //   const selectedPin = {
  //     _id: childProps._id,
  //     lat: childProps.trueLat,
  //     lng: childProps.trueLng,
  //     hover: true,
  //   };

  //   this.setState({ selectedPin });
  // };

  // onChildMouseLeave = (key, childProps) => {
  //   const selectedPin = {
  //     _id: null,
  //     lat: null,
  //     lng: null,
  //     hover: false,
  //   };

  //   this.setState({ selectedPin });
  // };

  // handleHover = (pinId) => {
  //   const { selectedPin } = this.state;
  //   if (pinId === selectedPin._id) return true;
  //   return false;
  // };

  onBoundsChange = (changeEvent: ChangeEventValue) => {
    //resets zoom on bounds change to make sure icon offset is recalculated
    this.setState({ zoom: changeEvent.zoom });
  };

  handlePinClick = (pinId: string) => {
    //sets selectedPin to clicked pin, and recenters to selectedPin
    const { currentLocation } = this.state;
    const {
      mapData: { locationPins },
    } = this.props;

    let selectedPin = [];
    if (pinId === "currentLocation") {
      selectedPin[0] = { ...currentLocation };
    } else {
      selectedPin = locationPins.filter((p) => p._id === pinId);
    }

    this.setState({
      selectedPin: selectedPin[0],
      center: selectedPin[0],
    });
    return null;
  };

  setCurrentLocation = (pos: any) => {
    const currentLocation = {
      _id: "currentLocation",
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    this.setState({
      currentLocation,
      center: currentLocation,
      selectedPin: currentLocation,
    });
  };

  getCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 1000,
    };

    navigator.geolocation.getCurrentPosition(
      this.setCurrentLocation,
      (err) => toast.error("Geolocation was not provided" + err),
      options
    );
  };

  renderCurrentLocationPin = (currentLocation: LocationDetails) => {
    const { zoom } = this.state;

    const { lat, lng } = calculateIconOffset(
      zoom,
      currentLocation,
      "dot circle outline"
    );
    return (
      <LocationPin
        _id={currentLocation._id}
        lat={lat}
        lng={lng}
        trueLat={currentLocation.lat}
        trueLng={currentLocation.lng}
        // hover={this.handleHover("currentLocation")}
        selected={false}
        currentLocation={true}
        onClick={this.handlePinClick}
      />
    );
  };

  renderLocationPins = (locationPins: LocationDetails[]) => {
    const { zoom, selectedPin } = this.state;

    locationPins.forEach(function (pin) {
      const { lat, lng } = calculateIconOffset(
        zoom,
        pin,
        "map marker alternate"
      );
      pin.latOffset = lat;
      pin.lngOffset = lng;
    });

    return locationPins.map((pin) => (
      <LocationPin
        key={pin._id}
        _id={pin._id}
        lat={pin.latOffset}
        lng={pin.lngOffset}
        trueLat={pin.lat}
        trueLng={pin.lng}
        selected={pin._id === selectedPin._id ? true : false}
        // hover={this.handleHover(pin._id)}
        currentLocation={false}
        onClick={this.handlePinClick}
      />
    ));
  };

  render() {
    // console.log("Map Rendered");

    const {
      mapData: { locationPins },
    } = this.props;

    const { currentLocation, zoom, center } = this.state;
    return (
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.defaultLocation}
          center={center}
          zoom={zoom}
          onChange={this.onBoundsChange}
          // onChildMouseEnter={this.onChildMouseEnter}
          // onChildMouseLeave={this.onChildMouseLeave}
        >
          {this.renderLocationPins(locationPins)}
          {this.renderCurrentLocationPin(currentLocation)}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
