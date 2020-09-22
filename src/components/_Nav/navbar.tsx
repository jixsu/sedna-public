import React from "react";
import { Link } from "react-router-dom";
import Searchbar from "../common/searchbar";
import Sidebar from "./sidebar";
import { Icon, Button } from "semantic-ui-react";
import { RouteComponentProps } from "react-router-dom";
import { withRouter } from "react-router-dom";

// import { CSSTransition } from "react-transition-group";
import "../../css/navbar.css";

interface MatchParams {}

interface NavbarProps extends RouteComponentProps<MatchParams> {
  shoppingCart: number;
}

interface NavbarState {
  searchQuery: string;
  sidebarActive: boolean;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  state = {
    searchQuery: "",
    sidebarActive: false,
  };

  handleSearchbar = (query: string) => {
    this.setState({ searchQuery: query });
    return null;
  };

  handleSearch = (e: any) => {
    //redirects to search
    const { searchQuery } = this.state;
    const { history } = this.props;
    e.preventDefault();

    history.push(`/buy/search/${searchQuery}`);
  };

  validateSearchButton = () => {
    //if search is empty, search cannot be clicked
    const { searchQuery } = this.state;
    return searchQuery === "" ? true : false;
  };

  handleSidebar = (sidebarActive: boolean) => {
    if (sidebarActive === true) {
      this.setState({ sidebarActive: false });
      return null;
    }
    this.setState({ sidebarActive: true });
    return null;
  };

  render() {
    const { searchQuery, sidebarActive } = this.state;
    const { shoppingCart, history } = this.props;

    return (
      <React.Fragment>
        {/* <CSSTransition
          in={sidebarActive}
          timeout={500}
          classNames="alert"
          unmountOnExit
        >
          <Sidebar onClose={this.handleSidebar} />
        </CSSTransition> */}
        {sidebarActive ? <Sidebar onClose={this.handleSidebar} /> : null}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            onClick={() => this.handleSidebar(sidebarActive)}
            className="btn btn-light"
            style={{ marginRight: 15 }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">
            Sedna
          </Link>
          <div className="navbar-nav ml-auto">
            <form
              className="form-inline my-2 my-lg-0"
              onSubmit={this.handleSearch}
            >
              <Searchbar
                value={searchQuery}
                onChange={this.handleSearchbar}
                placeholder="Search cars..."
              />
              <Button
                icon
                disabled={this.validateSearchButton()}
                style={{ marginLeft: 5 }}
              >
                <Icon name="search" />
              </Button>
            </form>

            <button className="btn btn-dark my-2" style={{ marginLeft: 15 }}>
              <span style={{ color: "white" }}>
                <i className="fa fa-car" style={{ marginRight: 8 }}></i>
                {shoppingCart}
              </span>
            </button>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default withRouter(Navbar);
