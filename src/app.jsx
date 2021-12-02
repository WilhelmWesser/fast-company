import React from "react";
import Users from "./layouts/users";
import { Switch, Route, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NavBar from "./components/ui/navBar";
import EditPage from "./components/page/editPage/editPage";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route
                    path="/users/:userId?/edit"
                    render={() => <EditPage />}
                />
                <Route path="/users/:userId?" render={() => <Users />} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
