import * as React from "react";
import _ from "lodash";
import { Icon } from "semantic-ui-react";
import "../../css/productBox.css";

export interface ContentFormat {
  img: { path: string };
  title: { path: string[] };
  price: { path: string; label: string[] };
  details: { path: string[]; label: string[] };
}

interface ProductBoxProps {
  content: any;
  contentFormat: ContentFormat;
}

interface ProductBoxState {
  img: number;
  arrowStyle: {
    opacity: number;
  };
}

class ProductBox extends React.Component<ProductBoxProps, ProductBoxState> {
  state = {
    img: 1,
    arrowStyle: {
      opacity: 0,
    },
  };

  generateTitle = (path: string[], content: any) => {
    const titleArray: string[] = [];
    path.map((path) => {
      titleArray.push(content[path]);
    });
    return titleArray.join(" ");
  };

  generatePrice = (path: string, label: string[], content: any) => {
    const priceArray: string[] = [];
    for (let x = 0; x < label.length; x++) {
      priceArray.push(label[x]);
      if (content[path][x]) {
        priceArray.push(content[path][x]);
      }
    }
    return priceArray.join("");
  };

  generateDetails = (path: string[], label: string[], content: any) => {
    const detailsArray: any[] = [];
    let index = 0;

    for (let y = 0; y < path.length; y++) {
      const detail: any[] = [];
      for (let x = 0; x < 2; x++) {
        detail.push(label[x + index]);
        if (x === 0) {
          detail.push(content[path[y]]);
        }
      }
      index = index + 2;
      detailsArray.push(
        <div key={path[y] + content._id}>{detail.join("")}</div>
        // detail.join("")
      );
    }
    // return detailsArray.join(", ");
    return detailsArray;
  };

  renderImage = (path: string, content: any, img: number) => {
    const { arrowStyle } = this.state;

    return (
      <div
        id="image"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {content[path].length !== 1 && (
          <div style={arrowStyle}>
            {img !== 1 && (
              <div id="left-arrow-div" onClick={this.handleLeftArrowClick}>
                <Icon name="arrow left" />
              </div>
            )}
            {img !== content[path].length && (
              <div id="right-arrow-div" onClick={this.handleRightArrowClick}>
                <Icon name="arrow right" />
              </div>
            )}
          </div>
        )}
        <img
          src={content[path][img - 1]}
          style={{ width: "100%", height: "100%" }}
        ></img>
      </div>
    );
  };

  handleLeftArrowClick = () => {
    const { img } = this.state;
    const newImg = img - 1;
    this.setState({ img: newImg });
  };

  handleRightArrowClick = () => {
    const { img } = this.state;
    const newImg = img + 1;
    this.setState({ img: newImg });
  };

  handleMouseEnter = () => {
    //shows image nav arrows
    const arrowStyle = {
      opacity: 1,
    };
    this.setState({ arrowStyle });
  };

  handleMouseLeave = () => {
    const arrowStyle = {
      opacity: 0,
    };
    this.setState({ arrowStyle });
  };

  render() {
    const { contentFormat, content } = this.props;
    const { img } = this.state;
    const title = this.generateTitle(contentFormat.title.path, content);
    const price = this.generatePrice(
      contentFormat.price.path,
      contentFormat.price.label,
      content
    );
    const details = this.generateDetails(
      contentFormat.details.path,
      contentFormat.details.label,
      content
    );

    return (
      <div
        style={{
          width: "250px",
          height: "250px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        {this.renderImage(contentFormat.img.path, content, img)}

        <div id="header">
          <div id="title">{title}</div>
          <div id="price">{price}</div>
        </div>
        <div id="details">{details}</div>
      </div>
    );
  }
}

export default ProductBox;
