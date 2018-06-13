import React, { Component } from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/title'
import 'echarts/lib/chart/line'
// import {getFetch} from '../../Math/Math'

class PVcharts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            themes: {}
        }
    }
    componentWillMount(){
        
    }
    getOption = () => {
        return {
            title: {
                text: '堆叠区域图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
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
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
    };

    render() {
        return (
            <div>
                <ReactEchartsCore
                    echarts={echarts}
                    option={this.getOption()}//配置
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: '500px', width: '100%' }}//样式
                    // theme={this.state.themes}
                    // onChartReady={this.onChartReadyCallback}
                    // onEvents={EventsDict}//方法
                    // ref={el => (this.el = el)}
                    opts={{ renderer: "svg" }}//use svg to render the chart
                ></ReactEchartsCore>
            </div>
        );
    }
}

export default PVcharts;