import React, { Component } from 'react';

import {Link,Route} from 'react-router-dom'
import Simple from '../Simple/Simple'
import Table from '../Tables/Tables'
class Action extends Component {
    render() {
        return (
            <div>
                <Link to='/Simple'>下一集</Link>
                {/* <Route path='../Simple/Simple.js' component={Simple}></Route> */}
                123
            </div>
        );
    }
}

export default Action;