import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Menu from "./Menu";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import CreateObservation from "../CreateObservation";
import EditObservation from "../EditObservation";

function Layout() {
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact path="/observations/new">
            <CreateObservation />
          </Route>
          <Route exact path="/observations/:observationId">
            <EditObservation />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
