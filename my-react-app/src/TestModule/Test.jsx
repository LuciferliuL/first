import React, { Component } from 'react';
import { Card, Tag, Spin } from 'antd'
import { getFetch, timeFn,ajaxGet} from '../Math/Math'
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
            dataArr:[],
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
            }]
        }
    }

     



    componentDidMount() {
        ajaxGet('../Report111.txt', (res) => {
            
            // console.log(res)
            let da = res.split('@').join(',')
            da = da.slice(0,da.length - 1)
            da = "[" + da + "]"
            // console.log(da)
            let resData = JSON.parse(da)
            console.log(resData)

            let A = 0,B = 0,C = 0
            resData.forEach(element => {
                switch (element.TestCaseStatus) {
                    case "Cancelled":
                        A++
                        break;
                    case "Pass":
                        B++
                        break;
                    case "Fail":
                        C++
                        break;
                    default:
                        break;
                }
            });

            let arr = [{value:A,name:"Cancelled"},{value:B,name:"Pass"},{value:C,name:"Fail"}]
            this.setState({
                data: resData,
                loading: false,
                dataArr:arr
            })
        })
    }
    render() {
        const { data, loading, dataArr, columns } = this.state
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
                            <PIE Data={dataArr}></PIE>
                        </CardGrid>
                        <CardGrid style={gridStyle100}>
                            <Tables data={data} columns={columns}></Tables>
                        </CardGrid>
                    </Card>
                </div>
            )
        }
    }
}

export default Test;