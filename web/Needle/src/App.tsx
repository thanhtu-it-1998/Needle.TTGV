import  { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { NavBar } from "./components/NavBar/NavBar";

import { appCtxDefaultValue, AppContext } from "./hooks/useGlobalContext";
import { Home } from "./pages/Home/index";
import { Login } from "./pages/Login/Index";
import { HeaderLogin } from "./pages/Login/header";
import { VaccineCreate } from "./pages/Vaccine/Create/Index";
import { ListVaccine } from './pages/Vaccine/List/index';
import { VaccineEdit } from './pages/Vaccine/Edit/Index';
import { ListHealthAdvice } from "./pages/ListOfHealthAdvices/List";
import { HealthAdviceCreate } from './pages/ListOfHealthAdvices/Create/Index';
import { HealthAdviceEdit } from "./pages/ListOfHealthAdvices/Edit/Index";
import { HealthConsultationCreate } from "./pages/HealthConsultations/Create/Index";
import { HealthConsultationList } from "./pages/HealthConsultations/List";
import { HealthConsultationEdit } from "./pages/HealthConsultations/Edit/Index";
import { UserManager } from "./pages/User/list";

function App() {
  const { classNameDefault, classNameActive } = appCtxDefaultValue;
  const [currentRoute, setCurrentRoute] = useState(
    appCtxDefaultValue.currentRoute
  );
  const [currentUser] = useState(
    appCtxDefaultValue.currentUser
  );
  const [token, setToken] = useState(appCtxDefaultValue.token);
  const [isNavBarActive, setIsNavBarActive] = useState(
    appCtxDefaultValue.isNavBarActive
  );

  return (
    <AppContext.Provider
      value={{
        classNameDefault,
        classNameActive,
        currentRoute,
        setCurrentRoute,
        currentUser,
        // setCurrentUser,
        token,
        setToken,
        isNavBarActive,
        setIsNavBarActive,
      }}
    >
      <div className="App">
        <Router>
          {token === null ? (
            <div>
              <HeaderLogin />
              <div>
                <Switch>
                  <Route path="/">
                    <Login />
                  </Route>
                </Switch>
              </div>
            </div>
          ) : (
            <div>
              <Header />
              <div className="body">
                <NavBar />
                <div className="session">
                  <Switch>
                    <Route exact path="/home">
                      <Home />
                    </Route>
                    <Route exact path="/SignUpForVaccines/list">
                      <UserManager />
                    </Route>
                    <Route exact path="/SignUpForVaccines/details">
                      <UserManager />
                    </Route>
                    <Route exact path="/vaccine/create">
                      <VaccineCreate />
                    </Route>
                    <Route exact path="/vaccine/edit/:id">
                      <VaccineEdit />
                    </Route>
                    <Route exact path="/vaccine/list">
                      <ListVaccine />
                    </Route>
                    <Route exact path="/HealthAdvices/create">
                      <HealthAdviceCreate />
                    </Route>
                    <Route exact path="/HealthAdvices/edit/:id">
                      <HealthAdviceEdit />
                    </Route>
                    <Route exact path="/HealthAdvices/list">
                      <ListHealthAdvice />
                    </Route>
                    <Route exact path="/healthConsultation/create">
                      <HealthConsultationCreate />
                    </Route>
                    <Route exact path="/healthConsultation/edit/:id">
                      <HealthConsultationEdit />
                    </Route>
                    <Route exact path="/healthConsultation/list">
                      <HealthConsultationList />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          )}
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
