import React, { Component } from 'react';
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Card, Input, Row, Col } from "antd";
import TabletargetCard from './TabletargetCard'
import Dustbin from '../component/Dustbin'

const gridStyleCenter = {
    width: '80%',
    textAlign: 'center',
};
const gridStyleRight = {
    width: '20%',
    textAlign: 'center',
};


class TableBuildBase extends Component {
    render() {
        return (
            <Row>
                <DragDropContextProvider backend={HTML5Backend}>
                    <Card title="Card Title">
                        <Col span="6">
                            <TabletargetCard></TabletargetCard>
                        </Col>
                        <Col span="18">
 
                                <Dustbin></Dustbin>
                           
                        </Col>
                    </Card>
                </DragDropContextProvider>
            </Row>

        );
    }
}

export default TableBuildBase;