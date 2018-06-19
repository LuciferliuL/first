import React, { Component } from 'react';
import EchartsReactCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import { ObjRegister, findName} from '../../Math/Math'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/line'
// import {getFetch} from '../../Math/Math'

/**
 * 接受数据1.Data  为数据  需要经过ObjRegister处理
 * @param{Data} 
 * @param{getBarChartsName} 传送点击的柱子
 */

class Barcharts extends Component {
    constructor(props) {
        super(props)
        const { Data } = this.props
        if (Data.length >= 1) {
            ObjRegister(Data)
            let name = []
            let value = []
            Data.map((v) => {
                name.push(v.Port)
                value.push(v.doc_count)
                return true
            })
            // console.log(Data)
            this.state = {
                themes: {},
                Data: Data,
                chartsName: name,
                chartsValue: value
            }
        }
    }
    componentWillReceiveProps(pre, next) {
        // console.log(pre)
        const Data = pre.Data
        if (Data.length >= 1) {
            ObjRegister(Data)
            let name = []
            let value = []
            Data.map((v) => {
                name.push(v.Port)
                value.push(v.doc_count)
                return true
            })
            this.setState({
                Data: Data,
                chartsName: name,
                chartsValue: value
            })
        }
    }
    componentWillUnmount(){
        this.setState({})
    }
    getOption = () => {
        return {
            color: ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.state.chartsName,
                    // data:[100,200,300,400,500,100],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '点击量',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.state.chartsValue,
                    // data:[111,222,444,555,666,7777],
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var colorList = ['#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed',
                                    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0',
                                    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700',
                                    '#6699FF', '#ff6666', '#3cb371', '#b8860b', '#30e0e0']
                                return colorList[params.dataIndex]
                            }
                        }
                    }
                }
            ]
        }
    };
    // EventsDict = ()=>{
    //     console.log(1)
    // }
    onChartReadyCallback = (e)=>{
        // console.log(e)
        e.on('click',(value)=>{//点击的柱子 发送的请求
            // console.log(value)
            let name = findName(value.name)
            console.log(name)
            this.props.getBarChartsName(name)
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


export default Barcharts;