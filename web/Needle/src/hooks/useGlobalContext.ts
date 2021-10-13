import { createContext } from "react";
import { ICurrentRoute } from "../models/ICurrentRoute";
import { IIsNavBarActive } from "../models/IIsNavBarActive";
// import { IUser } from "../models/IUser";
let initialDate = new Date();
export const appCtxDefaultValue = {
  // set a default value
  classNameDefault: "nav-bar-element",
  classNameActive: "nav-bar-element active",
  currentRoute: {
    firstRouteUrl: "",
    firstRoute: "Home",
    secondRoute: "",
  },
  setCurrentRoute: (c: ICurrentRoute) => {},
  currentUser: {
    id: "",
    staffCode: "",
    fullName: "",
    username: "",
    joinedDate: initialDate,
    location: "Ha Noi",
    type: "Staff",
  },
  token: localStorage.getItem("token"),
  setToken: (c: any) => {},
  isNavBarActive: {
    home: false,
    manageUser: false,
    manageVaccine : false,
    manageHealthAdvices:false,
    manageHealthConsultation:false
  },
  setIsNavBarActive: (c: IIsNavBarActive) => {},
};

export const AppContext = createContext(appCtxDefaultValue);
