import {BrowserRouter, Route, Switch } from 'react-router-dom';

import PrivateRouter, {} from './PrivateRoutes';

import LoginAdmin from './pages/LoginAdmin';
import RedirectUser from './pages/RedirectUser';
import ValidateCode from './pages/ValidateCode';
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardUser from './pages/DashboardUser'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={RedirectUser}/>
                <Route path='/login' component={LoginAdmin}/>
                <Route path='/sample/validate' component={ValidateCode}/>
                <PrivateRouter path='/admin/dashboard' component={DashboardAdmin}/>
                <Route path='/user/dashboard' component={DashboardUser}/>
            </Switch>
        </BrowserRouter>
    );
}