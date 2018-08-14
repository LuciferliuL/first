import React, { Component } from 'react';
import { Dragact, Icon, Popover } from 'dragact'
import Dustbin from '../component/Dustbin'

const getblockStyle = isDragging => {
    return {
        background: isDragging ? '#1890ff' : 'white'
    }
}

const Card = ({ item, provided, onchanges }) => {
    return (
        <div
            className="layout-Item"
            {...provided.props}
            {...provided.dragHandle}
            style={{
                ...provided.props.style,
                ...getblockStyle(provided.isDragging),
                paddingTop: '20px',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: 15,
                    height: 15,
                    right: 0,
                    top: 0,
                    cursor: 'pointer'
                }}
                onClick={() => onchanges(item)}
            >O
            </div>
            <div style={{ padding: 5, textAlign: 'center', color: '#595959' }}>
                <Dustbin item={item.content}></Dustbin>
            </div>
        </div>
    )
}
class TableTargetCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    hanldeOnDelete = (item) => {
        // console.log(item);
        this.props.onchanges(item)
    }
    render() {
        const { fakeData } = this.props
        return (
            <Dragact
                layout={fakeData} //必填项
                col={16} //必填项
                width={800} //必填项
                rowHeight={40} //必填项
                margin={[5, 5]} //必填项
                className="plant-layout" //必填项
                style={{ background: '#222222' }} //非必填项
                placeholder={true}
            >
                {(item, provided) => {
                    return (
                        <Card
                            item={item}
                            provided={provided}
                            onchanges={this.hanldeOnDelete}
                        />
                    )
                }}
            </Dragact>
        );
    }
}

export default TableTargetCard;