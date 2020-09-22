import * as React from "react";
import { Icon } from "semantic-ui-react";
import "../../css/sidebar.css";

interface SidebarProps {
  onClose: (sidebarActive: boolean) => null;
}

class Sidebar extends React.Component<SidebarProps> {
  // toggleOverlay = (sidebarActive: boolean) => {
  //   return sidebarActive === true ? "overlay active" : "overlay";
  // };

  render() {
    const { onClose } = this.props;
    return (
      <div className="wrapper">
        <Icon
          link
          id="close"
          name="close"
          size="big"
          onClick={() => onClose(true)}
        />

        <nav id="sidebar" className="navbar navbar-light bg-light">
          <div id="nav-content" className="nav flex-column">
            <div className="navbar-nav">
              <a className="navbar-brand" href="#">
                User
              </a>
              <a className="nav-item nav-link" href="#">
                Orders
              </a>
              <a className="nav-item nav-link" href="#">
                Sign in
              </a>
              <a className="nav-item nav-link" href="#">
                Logout
              </a>
            </div>
          </div>
        </nav>
        <div onClick={() => onClose(true)} className="overlay"></div>
      </div>
    );
  }
}

export default Sidebar;
