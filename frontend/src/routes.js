import {BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginAdmin from './pages/LoginAdmin';
import RedirectUser from './pages/RedirectUser';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={RedirectUser}/>
                <Route path="/login" component={LoginAdmin}/>
            </Switch>
        </BrowserRouter>
    );
}