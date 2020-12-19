import React from "react";
import navigation from "./config/navigation";
import { Route } from "react-router-dom";

export const Routes: React.FC = () => {
  return (
    <>
      {navigation.map((navItem) => {
        return (
          <Route
            key={navItem.path}
            path={navItem.path}
            exact={navItem.exact}
            component={navItem.component}
          />
        );
      })}
    </>
  );
};

export default Routes;
