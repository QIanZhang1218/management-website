import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginPage from '../src/Component/LogIn/LogIn';
import Dashboard from './Pages/Dashboard/Dashboard';
import SignUpPage from './Component/SignUp/SignUp';
function AppRouter () {
        return (
            <Route>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/SignUp" component={SignUpPage} />
                    <Route path="/Dashboard" component={Dashboard} />
                    {/*<Route path="/UserInfo" component={UserInfo}/>*/}
                </Switch>

            </Route>
        )

}
export default AppRouter