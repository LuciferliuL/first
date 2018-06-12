import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'antd'
import Cascaders from './Cascader/Cascaders'
import DataPick from '../Math/DataPick'
import './PV.css'
const ButtonGroup = Button.Group

class PV extends Component {
    render() {
        return (
            <div>
                <Row gutter={2}>
                    <Card>
                        <Row gutter={3}>
                            <Col span={8}>
                                <Cascaders></Cascaders>
                            </Col>
                            <Col span={6}>
                                <DataPick></DataPick>
                            </Col>
                            <Col span={6} className='btnGroup'>
                                <ButtonGroup >
                                    <Button>查询</Button>
                                    <Button>切换</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>

                    </Card>
                    <Col span={10}>
                        <Card title="详细表格" className='MarginTop'>
                            <p>123</p>
                        </Card>
                    </Col>
                    <Col span={14}>
                        <Card title="详细表格" className='MarginTop'>
                            <p>123</p>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default PV;