import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Links } from "./pages/Links";
import { Create } from "./pages/Create";
import { Detail } from "./pages/Detail";
import { Auth } from "./pages/Auth";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/links" exact>
          <Links />
        </Route>
        <Route path="/create" exact>
          <Create />
        </Route>
        <Route path="/detail/:id">
          <Detail />
        </Route>
        <Redirect to="/create" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
