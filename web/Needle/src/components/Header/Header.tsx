import { Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "../../hooks/useGlobalContext";
import "./Header.scss";

export const Header = (props: any) => {
  const history = useHistory();
  const { setCurrentRoute, currentUser, currentRoute, token, setToken } =
    useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleLogout = () => {
    setVisible(false);

    localStorage.removeItem("token");
    message.success("You have been successfully logged out!");
    setToken(null);
    setCurrentRoute({
      firstRouteUrl: "",
      firstRoute: "Home",
      secondRoute: "",
    });
    history.push("/login");
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleClick = () => {
    setCurrentRoute({
      firstRouteUrl: currentRoute.firstRouteUrl,
      firstRoute: currentRoute.firstRoute,
      secondRoute: "",
    });
  };

  return (
    <div className="page-header">
      {currentRoute.secondRoute === "" ? (
        <div className="routes float-left">
          <span>
            <span className="route-link">
              <Link to={currentRoute.firstRouteUrl}>
                {currentRoute.firstRoute}
              </Link>
            </span>
          </span>
        </div>
      ) : (
        <div className="routes float-left">
          <span>
            <span>
              <Link to={currentRoute.firstRouteUrl} onClick={handleClick}>
                {currentRoute.firstRoute}
              </Link>
            </span>
            {currentRoute.secondRoute === "" ? null : (
              <span className="route-sperator">{">"}</span>
            )}
          </span>
          {currentRoute.secondRoute === "" ? null : (
            <span>
              <span>
                <span>{currentRoute.secondRoute}</span>
              </span>
            </span>
          )}
        </div>
      )}
      {token !== null ? (
        <div className="dropdown rtl float-right">
          <span>
            <i className="fas fa-sort-down" /> {currentUser.username}
          </span>
          <div className="dropdown-content">
            <div>
              <span>{currentUser.fullName}</span>
            </div>
            <div>
              <Link to="/change-password">Change Password</Link>
            </div>
            <div>
              <span onClick={showModal}>
                Logout <i className="fas fa-sign-out-alt" />
              </span>
              <Modal
                title="Are you sure?"
                visible={visible}
                okText="Logout"
                onOk={handleLogout}
                onCancel={handleCancel}
              >
                <p>Do you want to log out?</p>
              </Modal>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
