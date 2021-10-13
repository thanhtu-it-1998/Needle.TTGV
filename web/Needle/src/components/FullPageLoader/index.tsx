import React from "react";
import Spinner from "../../resources/images/spinner.gif";

export const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src={Spinner} className="fp-loader" alt="loading" />
    </div>
  );
};
