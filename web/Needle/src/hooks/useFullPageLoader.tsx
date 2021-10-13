import React, { useState } from "react";
import { FullPageLoader } from "../components/FullPageLoader";

export const useFullPageLoader = () => {
  const [loading, setLoading] = useState(false);

  const loader = loading ? <FullPageLoader /> : null;

  const showLoader = () => {
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  return { loader, showLoader, hideLoader };
};
