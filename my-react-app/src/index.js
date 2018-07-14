import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import ar_EG from 'antd/lib/locale-provider/ar_EG';
// import {LocaleProvider} from 'antd'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import './Math/Config'

ReactDOM.render(
    // <LocaleProvider locale={ar_EG}>
        <BrowserRouter basename='/'>
            <Switch>
                <Route path="/Home" component={Home}></Route>{/*主页面*/}
                <Route exact path='/' component={Login}></Route>{/*登入页面*/}
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    // </LocaleProvider>
    , document.getElementById('root'));
registerServiceWorker();
