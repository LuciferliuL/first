import React, { Component } from 'react';
import {Checkbox} from 'antd'

class CheckBox extends Component {
    render() {
        return (
            <Checkbox
                checked={this.props.value}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
                >
                {this.props.text}
            </Checkbox>
        );
    }
}

export default CheckBox;