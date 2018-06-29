import React, { Component } from 'react';
import { Card, Tag, Spin } from 'antd'
import { getFetch, timeFn } from '../Math/Math'
import PIE from './charts/PIE'
import Tables from '../Component/Tables/Tables'
const CardGrid = Card.Grid

class Test extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true,
            Pie1: [],
            Pie2: [],
            table: []
        }
    }

    componentDidMount() {
        getFetch('../Report.json', (res) => {
            console.log(res)
            this.setState({
                data: JSON.parse(JSON.stringify(res)),
                loading: false
            })
        })
    }
    render() {
        const { data, loading } = this.state
        if (data.length < 1) {
            return (<Spin spinning={loading}></Spin>)
        } else {
            const starttime = data[0].ExecutionTime
            const endtime = data[data.length - 1].ExecutionTime
            const totaltime = timeFn(starttime, endtime)
            const gridStyle = {
                width: '50%',
                textAlign: 'center'
            }
            const gridStyle100 = {
                width: '100%',
                textAlign: 'center'
            }
            return (
                <div>
                    <Card title='自动化测试' extra={<div>
                        开始时间:
                        <Tag color='#2db7f5'>{starttime}</Tag>
                        结束时间:
                        <Tag color='#f50'>{endtime}</Tag>
                        总计用时:
                        <Tag color='#87d068'>{totaltime}</Tag>
                    </div>}>
                        <CardGrid style={gridStyle}>
                            <PIE></PIE>
                        </CardGrid>
                        <CardGrid style={gridStyle}>
                            <PIE></PIE>
                        </CardGrid>
                        <CardGrid style={gridStyle100}>
                            <Tables></Tables>
                        </CardGrid>
                    </Card>
                </div>
            )
        }

    }
}

export default Test;