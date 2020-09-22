import React from "react";
import Search from "./components/_Search/search";
import Buy from "./components/_Buy/buy";
import NotFound from "./components/_NotFound/notFound";
import Navbar from "./components/_Nav/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppState {
  user: {
    shoppingCart: number;
  };
}

class App extends React.Component<{}, AppState> {
  state = {
    user: {
      shoppingCart: 0,
    },
  };
  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar shoppingCart={user.shoppingCart} />
        <Switch>
          <Route path="/:id/search/:query" component={Search} />
          <Route path="/buy" component={Buy} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/buy" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
