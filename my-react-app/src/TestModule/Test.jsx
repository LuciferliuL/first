import React, { Component } from 'react';
import { Card, Tag, Spin } from 'antd'
import { getFetch, timeFn, ajaxGet, testCase } from '../Math/Math'
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
            columns: [{
                title: 'TestCaseDescription',
                dataIndex: 'TestCaseDescription',
                key: 'TestCaseDescription',
            }, {
                title: 'TestCaseName',
                dataIndex: 'TestCaseName',
                // key: 'PK',
            }, {
                title: 'BillCatalog',
                dataIndex: 'BillCatalog',
                // key: 'PK',
            }, {
                title: 'BillScripe',
                dataIndex: 'BillScripe',
            }, {
                dataIndex: 'BillTypeName',
                title: 'BillTypeName'
                // key: 'PK',
            }, {
                title: 'Author',
                dataIndex: 'Author',
                // key: 'PK',
            }, {
                title: 'CreateTime',
                dataIndex: 'CreateTime'
            }],

            Tsets:[]
        }
    }





    componentDidMount() {
        ajaxGet('../TC.txt', (res) => {

            // console.log(res)
            let da = res.split('@').join(',')
            da = da.slice(0, da.length - 1)
            da = "[" + da + "{}]"
            // console.log(da)
            let resData = JSON.parse(da)
            resData.pop()
            // console.log(resData)
            let Tsets = []
            let arr = [], A = 0, B = 0, C = 0
            testCase(resData, true, (res, ctx) => {
                arr = res
                console.log(ctx)
                Tsets = ctx
                for (var k in ctx) {
                    let con = 0
                    ctx[k].forEach(element => {
                        console.log(element)
                        if (element.TestCaseStatus === "Failed") {
                            con = 3
                        } else if (element.TestCaseStatus === 'Pass') {
                            if (con < 3) {
                                con = 2
                            }
                        } else {
                            if (con < 2) {
                                con = 0
                            }
                        }
                    });
                    console.log(con)
                    if (con === 3) {
                        C++
                    } else if (con === 2) {
                        B++
                    } else {
                        A++
                    }
                }

            })
            let caseArr = [{ value: A, name: "Cancelled" }, { value: B, name: "Pass" }, { value: C, name: "Fail" }]
            console.log(caseArr)

            this.setState({
                data: resData,
                loading: false,
                Pie2: arr,
                Pie1: caseArr,
                Tsets:Tsets
            })
        })
    }
    render() {
        const { data, loading, Pie2, columns, Pie1, Tsets } = this.state
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
                            <span>Total Tsets:{Object.keys(Tsets).length}</span>
                        </CardGrid>
                        <CardGrid style={gridStyle}>
                            <span>Total Steps:{data.length}</span>
                        </CardGrid>
                        <CardGrid style={gridStyle}>
                            <PIE Data={Pie1}></PIE>
                        </CardGrid>
                        <CardGrid style={gridStyle}>
                            <PIE Data={Pie2}></PIE>
                        </CardGrid>

                    </Card>
                </div>
            )
        }
    }
}

export default Test;