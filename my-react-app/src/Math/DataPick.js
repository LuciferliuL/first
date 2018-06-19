import React, { Component } from 'react';
import { DatePicker } from 'antd'
import moment from 'moment'
import {getTime} from './Math'
const {RangePicker} = DatePicker
const dateFormat = 'YYYY/MM/DD';

class DataPick extends Component {
    onOk = (v)=>{
        console.log(v)
    }
    disabledDate = (current)=>{//禁止选择的时间
        return current > moment().endOf('day');
    }
    onChange = (dates, dateStrings)=>{//选择时间有改变触发
        console.log(dates)
        // console.log(dateStrings[0]+',to:'+dateStrings[1])
        this.props.handleChangeDate(dateStrings)
    }
    render() {
        return (
            <div>
                <RangePicker
                    defaultValue={[moment(getTime(), dateFormat), moment(getTime(), dateFormat)]}
                    format={dateFormat}
                    disabledDate={this.disabledDate}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default DataPick;