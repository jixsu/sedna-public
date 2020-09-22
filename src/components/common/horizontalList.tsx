import * as React from "react";
import ProductBox from "./productBox";
import { Icon } from "semantic-ui-react";
import { ContentFormat } from "./productBox";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

interface HorizontalListProps extends RouteComponentProps {
  category: any;
  contents: any;
  contentFormat: ContentFormat;
}

interface HorizontalListState {
  slide: number;
  slideSize: number;
}

class HorizontalList extends React.Component<
  HorizontalListProps,
  HorizontalListState
> {
  state = {
    slide: 1,
    slideSize: 5,
  };

  renderList = (
    contents: any,
    contentFormat: ContentFormat,
    slide: number,
    slideSize: number
  ) => {
    const totalSlides = Math.ceil(contents.length / slideSize);
    let contentsBySlide: any = [];
    // if statement below determines size of list
    if (totalSlides === slide) {
      contentsBySlide = contents.slice(
        slideSize * (slide - 1),
        contents.length
      );
    } else {
      contentsBySlide = contents.slice(
        slideSize * (slide - 1),
        slideSize * slide
      );
    }
    return contentsBySlide.map((c: any) => {
      return (
        <ProductBox key={c._id} content={c} contentFormat={contentFormat} />
      );
    });
  };

  handleLeftArrowClick = () => {
    const { slide } = this.state;
    const newSlide = slide - 1;
    this.setState({ slide: newSlide });
  };

  handleRightArrowClick = () => {
    const { slide } = this.state;
    const newSlide = slide + 1;
    this.setState({ slide: newSlide });
  };

  render() {
    const { category, contents, contentFormat, history } = this.props;
    const { slide, slideSize } = this.state;

    const totalSlides = Math.ceil(contents.length / slideSize);
    return (
      <div className="container-fluid">
        <div className="row">
          <div
            className="col m-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ fontSize: "20px" }}>{category.name}</p>
          </div>
          <div className="col m-4" style={{ textAlign: "end" }}>
            <Link
              className="btn btn-dark"
              style={{ marginRight: "15px" }}
              to={history.location.pathname + "/search/" + category.name}
            >
              View All
            </Link>
            <Icon
              link={slide !== 1}
              circular
              name="arrow left"
              size="large"
              style={{ marginRight: "10px" }}
              onClick={this.handleLeftArrowClick}
              disabled={slide === 1}
            />
            <Icon
              link={slide !== totalSlides}
              circular
              name="arrow right"
              size="large"
              style={{ marginRight: "10px" }}
              onClick={this.handleRightArrowClick}
              disabled={slide === totalSlides}
            />
          </div>
        </div>
        <div className="row m-2">
          {this.renderList(contents, contentFormat, slide, slideSize)}
        </div>
      </div>
    );
  }
}

export default withRouter(HorizontalList);
