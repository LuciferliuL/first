import React, { Component } from 'react';
import { Card } from "antd";
import BaseInputcomponent from "../component/BaseInputcomponent";

const gridStyle = {
    width: '100%',
    textAlign: 'center',
};
class TabletargetCard extends Component {
    render() {
        return (
            <div>

                    <BaseInputcomponent></BaseInputcomponent>


                    <BaseInputcomponent></BaseInputcomponent>
 
                    <BaseInputcomponent></BaseInputcomponent>
 
                    <BaseInputcomponent></BaseInputcomponent>

            </div>

        );
    }
}

export default TabletargetCard;