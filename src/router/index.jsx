import React from "react";
import { HashRouter as Router , Route, Switch } from "react-router-dom";
import {createBrowserHistory} from "history";

import HomePage from "../Component/HomePage/HomePage";
import Login from "../LogIn";
import SignUp from "../SignUp";

export default function MyRoute(){
    return(
        <Router history = {createBrowserHistory()}>
            <Switch>
                <Route exact path="/" component = { Login } />
                <Route path="/SignUp" component ={ SignUp } />
                <HomePage path="/HomePage" component={ HomePage } />

                <HomePage/>
            </Switch>
        </Router>
    )

}