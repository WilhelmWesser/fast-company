import React from "react";
import Users from "./components/users";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import NavBar from "./components/layouts/navBar";
import Loading from "./components/layouts/loading";
import UsersPage from "./components/layouts/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" render={() => <Users />} />
                <Route path="/userPage/:userId?" component={UsersPage} />
                <Route path="/404" component={Loading} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default App;
