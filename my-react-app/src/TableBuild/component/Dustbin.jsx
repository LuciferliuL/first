import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

/**
 * drop(props, monitor, component) 组件放下时触发的事件，可选。
hover(props, monitor, component) 组件在DropTarget上方时响应的事件，可选。
canDrop(props, monitor) 组件可以被放置时触发的事件，可选。
 */
const targetSpec = {
    drop(props, monitor, component) {
        // ..
    },
    hover(props, monitor, component) {
        // ..
    },
    canDrop(props, monitor) {
        // ..
    }
}
const box = {
    width:'100px',
    height:'100px'
}
class Dustbin extends Component {
    render() {
        const { connectDropTarget } = this.props
        return connectDropTarget(
            <div style={box}>

            </div>
        );
    }
}

export default DropTarget('input', targetSpec, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))(Dustbin);