import { message } from "antd";
import React, { useEffect } from "react";

export const ForbiddenPage = () => {
  useEffect(() => {
    message.error("403 Forbidden!");
  }, []);
  return (
    <div>
      <div className="session-title">
        <span>403 Forbidden</span>
      </div>

      <div>Only admin can access this website!</div>
    </div>
  );
};
