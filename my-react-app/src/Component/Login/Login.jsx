import React, { Component } from 'react';

import {Link,Route} from 'react-router-dom'
class Login extends Component {
    render() {
        return (
            <div>
                <Link to='/Component/Action/Action.js'>Action</Link>
                <Link to='/Component/Simple/Simple.js'>2级目录</Link>
            </div>
        );
    }
}

export default Login;