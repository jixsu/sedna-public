const iconsOffset = [
  {
    name: "map marker alternate",
    xOffset: -32,
    yOffset: 55,
  },
  {
    name: "dot circle outline",
    xOffset: -12,
    yOffset: 9,
  },
];

type LocationDetails = {
  _id: string;
  lat: number;
  lng: number;
  latOffset?: number;
  lngOffset?: number;
};

export function calculateIconOffset(
  zoom: number,
  location: LocationDetails,
  iconName: string
) {
  //this function was created to recenter custom marker pins
  //offsetX and offsetY represent the number of pixels from the current center to the center of the marker pin
  //these two numbers were found using photoshop

  const pxToKm = (1 / Math.pow(2, zoom)) * 90.803098; // at zoom 0, each px is 90.803098km. This adjusts the ratio depending on zoom

  const iconOffset = iconsOffset.filter((icon) => icon.name === iconName); //finds correct icon

  const kmOffset = {
    x: pxToKm * iconOffset[0].xOffset,
    y: pxToKm * iconOffset[0].yOffset,
  };

  const radiusEarth = 6378;

  //now convert x and y km to lat and lng equivalent to determine offset coordinates
  //the following formula works when offset distance is small relative to the radius of the earth, and is not at the poles
  const offsetCoordinates = {
    lat: location.lat + (kmOffset.y / radiusEarth) * (180 / Math.PI),
    lng:
      location.lng +
      ((kmOffset.x / radiusEarth) * (180 / Math.PI)) /
        Math.cos((location.lat * Math.PI) / 180),
  };

  return offsetCoordinates;
}
