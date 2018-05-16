import React, { Component } from 'react';

import {Link,Route} from 'react-router-dom'
import Table from '../Tables/Tables'
class Simple extends Component {
    render() {
        return (
            <div>
                <Link to='/Table'>Table</Link>
            </div>
        );
    }
}

export default Simple;