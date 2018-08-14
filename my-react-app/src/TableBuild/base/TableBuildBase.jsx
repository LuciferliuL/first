import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd'
import TableTargetCard from './TabletargetCard'
import Basecomponent from '../component/Basecomponent'
import ShowData from '../component/ShowData'

const Words = [
    { content: 'You can do anything, but not everything.' },
    { content: 'Those who dare to fail miserably can achieve greatly.' },
    { content: 'You miss 100 percent of the shots you never take.' },
    { content: 'Those who believe in telekinetics, raise my hand.' },
    { content: 'I’d rather live with a good question than a bad answer.' }
]
class TableBuildBase extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fakeData: [],
            targetData:{}
        }
    }
    componentDidMount() {
        this.setState({
            fakeData: this.fakeData(Words)
        })
    }
    //动态生成排序
    fakeData = (Words) => {
        var Y = 0
        return Words.map((item, index) => {
            if (index % 4 === 0) Y++

            return {
                ...item,
                GridX: (index % 4) * 4,
                GridY: Y * 4,
                w: 4,
                h: 2,
                key: index
            }
        })
    }
    //添加元素
    additem = (e) => {
        console.log(e);
        Words.push({ type: e.itemkey, content: e })
        this.setState({
            fakeData: this.fakeData(Words)
        }, () => {
            console.log(this.state.fakeData)
        })
    }
    //选中元素
    onchanges = (item) => {
        // console.log(item);
        this.setState({
            targetData:item
        })
    }
    //删除元素
    onDelete = (key) => {
        const change = this.state.fakeData.filter(e => {
            if(e.key !== key){
                return e
            }
        })
        this.setState({
            fakeData:change
        })
    }
    render() {
        const { fakeData , targetData} = this.state
        return (
            <Row>
                <Col span={4}>
                    <Basecomponent additem={this.additem}></Basecomponent>
                </Col>
                <Col span={16}>
                    <Card>
                        <TableTargetCard fakeData={fakeData} onchanges={this.onchanges}></TableTargetCard>
                    </Card>
                </Col>
                <Col span={4}>
                    <Card>
                        <ShowData targetData={targetData}></ShowData>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default TableBuildBase;