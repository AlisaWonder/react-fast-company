import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPageEdit from "./components/page/userPageEdit/userPageEdit";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route
                            path="/users/:userId/edit"
                            component={UserPageEdit}
                        />
                        <Route path="/users/:userId?" component={Users} />
                        <Route path="/login/:type?" component={Login} />
                    </QualitiesProvider>
                </ProfessionProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
