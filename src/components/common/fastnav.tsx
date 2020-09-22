import * as React from "react";
import { Type } from "../../services/fake/fakeCarTypeService";
import "../../css/fastnav.css";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

interface FastNavProps extends RouteComponentProps {
  types: Type[];
}

const FastNav: React.SFC<FastNavProps> = ({ types, history }) => {
  return (
    <div className="fast-nav m-4 ">
      {types.map((type: Type) => {
        return (
          <Link
            key={type._id}
            className="car-icon btn btn-light"
            to={history.location.pathname + "/search/" + type.name}
          >
            <img src={type.img} alt={type.name} className="img" />
            <p className="img-text">{type.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default withRouter(FastNav);
