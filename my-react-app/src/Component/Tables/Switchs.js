import React, { Component } from 'react';
import {Switch} from 'antd'

class Switchs extends Component {
    onChange(checked) {
        console.log(`switch to ${checked}`);
      }
    render() {
        return (
            <Switch 
            defaultChecked 
            onChange={this.onChange.bind(this)}
            checkedChildren='true'
            uncheckedchildren='false' 
            />
        );
    }
}

export default Switchs;