import React, { Component } from 'react';
import { Input, Card } from "antd";
import { DragSource } from 'react-dnd';

/**
 * beginDrag(props, monitor, component): 拖动开始时触发的事件，必须。返回跟props相关的对象。
endDrag(props, monitor, component): 拖动结束时触发的事件，可选。
canDrag(props, monitor): 当前是否可以拖拽的事件，可选。
isDragging(props, monitor): 拖拽时触发的事件，可选
 */
const sourceSpec = {
    beginDrag(props, monitor, component) {
        // 返回需要注入的属性
        return {
            id: props.id
        }
    },
    endDrag(props, monitor, component) {
        // ..
    },
    canDrag(props, monitor) {
        // ..
    },
    isDragging(props, monitor) {
        // ..
    }
}
const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
class BaseInputcomponent extends Component {
    render() {
        const { connectDragSource } = this.props
        return connectDragSource(
            <div>
                <Card.Grid style={gridStyle}>
                    <Input></Input>
                </Card.Grid>
            </div>

        );
    }
}

export default DragSource('input', sourceSpec, (connect) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
}))(BaseInputcomponent);