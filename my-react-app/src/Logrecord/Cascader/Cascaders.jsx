import React, { Component } from 'react';
import { Cascader } from 'antd';
import { getFetch } from '../../Math/Math';
import {GetPV} from '../../Math/APIconfig'
import './Cascader.css'
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];
class Cascaders extends Component {
    state = {
        options
    }
    componentWillMount() {
        getFetch(GetPV().GetOrgList, (res)=>{
            let data = JSON.parse(res)
            console.log(data)
        })
    }
    onChange = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div>
                <Cascader
                    className='CascaderWidth'
                    options={options}
                    expandTrigger="hover"
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default Cascaders;