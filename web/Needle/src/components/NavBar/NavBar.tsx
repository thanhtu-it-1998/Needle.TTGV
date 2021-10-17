/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./NavBar.scss";
import { useHistory } from "react-router-dom";

import NeedleLogo from "../../resources/images/Needle.png";
import { ICurrentRoute } from "../../models/ICurrentRoute";
import { AppContext } from "../../hooks/useGlobalContext";
export const NavBar = (props: any) => {
  const {
    classNameActive,
    classNameDefault,
    setCurrentRoute,
    isNavBarActive,
    setIsNavBarActive,
  } = useContext(AppContext);

  let [classNameNavBarElement, setClassNameNavBarElement] = useState({
    home: classNameDefault,
    manageUser: classNameDefault,
    manageVaccine: classNameDefault,
    manageHealthAdvices:classNameDefault,
    manageHealthConsultation:classNameDefault
  });

  const history = useHistory();

  const handleHome = () => {
    setIsNavBarActive({
      home: true,
      manageUser: false,
      manageVaccine: false,
      manageHealthAdvices:false,
      manageHealthConsultation:false
    });
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/home",
      firstRoute: "Trang Chủ",
      secondRoute: "",
    };

    setCurrentRoute(currentRoute);
    history.push("/home");
  };
  const handleManageUser = () => {
    setIsNavBarActive({
      home: false,
      manageUser: true,
      manageVaccine: false,
      manageHealthAdvices:false,
      manageHealthConsultation:false

    });
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/SignUpForVaccines/list",
      firstRoute: "Quản lý tiêm",
      secondRoute: "",
    };

    setCurrentRoute(currentRoute);
    history.push("/SignUpForVaccines/list");
  };
  const handleManageVaccine = () => {
    setIsNavBarActive({
      home: false,
      manageUser: false,
      manageVaccine: true,
      manageHealthAdvices:false,
      manageHealthConsultation:false

    });
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/vaccine/list",
      firstRoute: "Quản lý Vaccines",
      secondRoute: "",
    };
    setCurrentRoute(currentRoute);
    history.push("/vaccine/list");
  };
  const handleManageHealthAdvices = () => {
    setIsNavBarActive({
      home: false,
      manageUser: false,
      manageVaccine: false,
      manageHealthAdvices:true,
      manageHealthConsultation:false

    });
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/HealthAdvices/list",
      firstRoute: "Danh mục bài viết ",
      secondRoute: "",
    };
    setCurrentRoute(currentRoute);
    history.push("/HealthAdvices/list");
  };
  const handleManageHHealthConsultation = () => {
    setIsNavBarActive({
      home: false,
      manageUser: false,
      manageVaccine: false,
      manageHealthAdvices:false,
      manageHealthConsultation:true

    });
    const currentRoute: ICurrentRoute = {
      firstRouteUrl: "/healthConsultation/list",
      firstRoute: " Quản lý bài viết",
      secondRoute: "",
    };
    setCurrentRoute(currentRoute);
    history.push("/healthConsultation/list");
  };

  useEffect(() => {
    if (isNavBarActive.home === true) {
      setClassNameNavBarElement({
        home: classNameActive,
        manageUser: classNameDefault,
        manageVaccine: classNameDefault,
        manageHealthAdvices:classNameDefault,
        manageHealthConsultation:classNameDefault

      });
    } else if (isNavBarActive.manageUser === true) {
      setClassNameNavBarElement({
        home: classNameDefault,
        manageUser: classNameActive,
        manageVaccine: classNameDefault,
        manageHealthAdvices:classNameDefault,
        manageHealthConsultation:classNameDefault

      });
    } else if (isNavBarActive.manageVaccine === true) {
      setClassNameNavBarElement({
        home: classNameDefault,
        manageUser: classNameDefault,
        manageVaccine: classNameActive,
        manageHealthAdvices:classNameDefault,
        manageHealthConsultation:classNameDefault

      });
    }
    else if (isNavBarActive.manageHealthAdvices === true) {
      setClassNameNavBarElement({
        home: classNameDefault,
        manageUser: classNameDefault,
        manageVaccine: classNameDefault,
        manageHealthAdvices:classNameActive,
        manageHealthConsultation:classNameDefault

      });
    }
    else if (isNavBarActive.manageHealthConsultation === true) {
      setClassNameNavBarElement({
        home: classNameDefault,
        manageUser: classNameDefault,
        manageVaccine: classNameDefault,
        manageHealthAdvices:classNameDefault,
        manageHealthConsultation:classNameActive

      });
    }
  }, [
    isNavBarActive.home,
    isNavBarActive.manageUser,
    isNavBarActive.manageVaccine,
    isNavBarActive.manageHealthAdvices,
    isNavBarActive.manageHealthConsultation
  ]);

  return (
    <div className="nav-bar">
      <div>
        <img src={NeedleLogo} className="needle-logo" alt="Needle Logo" />
      </div>
      <span className="nav-title">Quản lý tiêm vaccine trực tuyến</span>
      <ul className="nav-bar-list">
        <li className={classNameNavBarElement.home} onClick={handleHome}>
          <span>Trang Chủ</span>
        </li>
        <>
          <li
            className={classNameNavBarElement.manageUser}
            onClick={handleManageUser}
          >
            <span>Quản lý tiêm</span>
          </li>
          <li
            className={classNameNavBarElement.manageVaccine}
            onClick={handleManageVaccine}
          >
            <span>Quản lý Vaccines</span>
          </li>
          <li
            className={classNameNavBarElement.manageHealthAdvices}
            onClick={handleManageHealthAdvices}
          >
            <span>Danh mục bài viết</span>
          </li>
          <li
            className={classNameNavBarElement.manageHealthConsultation}
            onClick={handleManageHHealthConsultation}
          >
            <span>Quản lý bài viết</span>
          </li>
        </>
      </ul>
    </div>
  );
};
