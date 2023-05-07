import * as React from "react";
import { useNavigate } from "react-router-dom";

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigatex = useNavigate();

    // use window.href when we need to go to server
    // else use useNavigate()
    function navigate(link) {
      if (!link.startsWith("/api")) {
        navigatex(link);
      } else {
        window.location.href = link;
      }
    }

    return <Component navigate={navigate} {...props} />;
  };

  return Wrapper;
};

export default withRouter;
