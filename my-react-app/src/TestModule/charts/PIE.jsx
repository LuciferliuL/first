import React, { Component } from 'react';
import EchartsReactCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'

/**
 * 接受数据1.Data  为数据  需要经过ObjRegister处理
 * @param{Data} 
 * @param{getBarChartsName} 传送点击的柱子
 */

class PIE extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataname: [],
        }
    }
    componentDidMount() {
        console.log(this.props.Data)
        let { Data } = this.props
        if (typeof Data !== 'undefined') {
            let name = []
            Data.forEach(element => {
                name.push(element.name)
            });
            this.setState({
                data: Data,
                dataname: name
            })
        }
    }
    componentWillReceiveProps(pre) {
        console.log(pre)
    }
    getOption = () => (
        {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: this.state.dataname
            },
            series: [
                {
                    name: '数据结构',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            // position: 'center',
                            formatter: '  {b|{b}：}{c}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                // a: {
                                //     color: '#999',
                                //     lineHeight: 12,
                                //     align: 'center'
                                // },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 12,
                                    lineHeight: 14
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
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
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: this.state.data

                }
            ]
        }
    )
    // EventsDict = ()=>{
    //     console.log(1)
    // }
    // onChartReadyCallback = (e) => {
    //     // console.log(e)
    //     e.on('click', (value) => {//点击的柱子 发送的请求
    //         // console.log(value)
    //         // let name = findName(value.name)
    //         // console.log(name)
    //         this.props.getBarChartsName(value)
    //     })
    // }
    render() {
        return (
            <div>
                <EchartsReactCore
                    echarts={echarts}
                    option={this.getOption()}//配置
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: '250px', width: '100%' }}//样式
                    opts={{ renderer: "svg" }}//use svg to render the chart
                ></EchartsReactCore>
            </div>
        );
    }
}


export default PIE;