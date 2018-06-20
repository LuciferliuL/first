import React, { Component } from 'react';
import EchartsReactCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
// import {getFetch} from '../../Math/Math'

/**
 * 接受数据1.Data  为数据  需要经过ObjRegister处理
 * @param{Data} 
 * @param{getBarChartsName} 传送点击的柱子
 */

class Piecharts extends Component {
    constructor(props) {
        super(props)
        const { Data } = this.props
        this.PieObj = [
            { value: 0, name: '0s - 1s', max: '1', min: '0' },
            { value: 0, name: '1s - 5s', max: '5', min: '1' },
            { value: 0, name: '5s - 10s', max: '10', min: '5' },
            { value: 0, name: '> 10s', max: '999', min: '10' }
        ]
        Data.forEach(element => {
            let s = element / 1000
            if (s < 1) {
                this.PieObj[0].value++
            } else if (s > 1 && s < 5) {
                this.PieObj[1].value++
            } else if (s > 5 && s < 10) {
                this.PieObj[2].value++
            } else {
                this.PieObj[3].value++
            }
        });
        this.state = {
            Data: this.PieObj,
        }
    }
    componentWillUnmount() {
        this.setState({})
    }
    getOption = () => (
        {
            title: {
                text: '延迟统计',
                subtext: '虚构数据',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "延迟记录"
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['0s - 1s', '1s - 5s', '5s - 10s', '> 10s']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: this.state.Data,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                                    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                                    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                                    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0']
                                return colorList[params.dataIndex]
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    );
    // EventsDict = ()=>{
    //     console.log(1)
    // }
    onChartReadyCallback = (e) => {
        // console.log(e)
        e.on('click', (value) => {//点击的柱子 发送的请求
            // console.log(value)
            // let name = findName(value.name)
            // console.log(name)
            this.props.getBarChartsName(value)
        })
    }
    render() {
        return (
            <div>
                <EchartsReactCore
                    echarts={echarts}
                    option={this.getOption()}//配置
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: '673px', width: '100%' }}//样式
                    // theme={theme}
                    onChartReady={this.onChartReadyCallback}
                    // onEvents={this.EventsDict}//方法
                    ref={(e) => { this.echarts_react = e; }}
                    opts={{ renderer: "svg" }}//use svg to render the chart
                ></EchartsReactCore>
            </div>
        );
    }
}


export default Piecharts;