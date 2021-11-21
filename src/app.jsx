import React from "react";
import Users from "./layouts/users";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
import UsersPage from "./components/page/userPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" render={() => <Users />} />
                <Route path="/userPage/:userId?" component={UsersPage} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
