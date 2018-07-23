import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Tag, Button, Row, Col } from 'antd';
import { Link, Route } from 'react-router-dom'
import Action from '../Action/Action';
import Windows from '../Windows/Windows_'
import Simple from '../Simple/Simple';
import PVComponent from '../../Logrecord/PVComponent';
import TimeComponent from '../../Logrecord/TimeComponent'
import Errorlog from '../../Logrecord/Errorlog'
import AcerageComponent from "../../Logrecord/AverageComponent.jsx";
import Bill from '../../Component/Bill/Bill'
import AsyncData from '../../Builds/AsyncData';
import PopWindows from '../PopWindows/PopWindows';
import Test from '../../TestModule/Test';
import SQLManage from '../SQLManage/SQLManage';
import TableUpdate from '../../Builds/TableUpdate';
import AsyncDataManage from '../../Builds/AsyncDataManage'
import Simple_ from '../Simple/Simple_'
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class Home extends React.Component {
    rootSubmenuKeys = ['配置', '发布与构建', '日志查询', '测试'];
    state = {
        collapsed: false,
        name: '',
        openKeys: [''],
        BreadcrumbSub: '',
        BreadcrumbKey: ''
    };
    componentWillMount() {
        let values = this.props.location.state
        if (values === undefined) {
            this.props.history.push('/')
        } else {
            values = JSON.stringify(values.userName).replace(/\"/g, '')
            // console.log(values)
            this.setState({
                name: values
            })
        }
    }
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    click = (item) => {
        // console.log(item)
        this.setState({
            BreadcrumbKey: item.key
        })
    }
    //打开条目的回调
    onOpenChange = (openKeys) => {
        // console.log(openKeys)
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            // console.log(1)//关闭
            this.setState({ openKeys, BreadcrumbSub: openKeys[openKeys.length - 1] });
        } else {
            // console.log(2)//打开
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
                BreadcrumbSub: openKeys[openKeys.length - 1],
                BreadcrumbKey: ''
            });
        }
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        onSelect={this.click}
                    >
                        <SubMenu
                            key="配置"
                            title={<span><Icon type="setting" /><span>配置</span></span>}
                        >
                            <Menu.Item key="菜单管理"><Link to={'/Home/Action/' + this.state.name}>菜单管理</Link></Menu.Item>
                            <Menu.Item key="窗体行为编辑"><Link to={'/Home/Windows/' + this.state.name}>窗体行为编辑</Link></Menu.Item>
                            <Menu.Item key="简单通用查询"><Link to={'/Home/Simple_/' + this.state.name}>简单通用查询</Link></Menu.Item>
                            <Menu.Item key="单据定义"><Link to={'/Home/Bill/' + this.state.name}>单据定义</Link></Menu.Item>
                            <Menu.Item key="弹出选择窗口管理"><Link to={'/Home/PopWindows/' + this.state.name}>弹出选择窗口管理</Link></Menu.Item>
                            <Menu.Item key="SQL语句管理"><Link to={'/Home/SQLManage/' + this.state.name}>SQL语句管理</Link></Menu.Item>
                            
                        </SubMenu>
                        <SubMenu
                            key="发布与构建"
                            title={<span><Icon type="appstore" /><span>发布与构建</span></span>}
                        >
                            <Menu.Item key="数据同步"><Link to={'/Home/AsyncData/' + this.state.name}>数据同步</Link></Menu.Item>
                            <Menu.Item key="表结构更新管理"><Link to={'/Home/TableUpdate/' + this.state.name}>表结构更新管理</Link></Menu.Item>
                            <Menu.Item key="数据同步管理"><Link to={'/Home/AsyncDataManage/' + this.state.name}>数据同步管理</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="日志查询"
                            title={<span><Icon type="line-chart" /><span>日志查询</span></span>}
                        >
                            <Menu.Item key="按条件分组"><Link to='/Home/PVComponent'>按条件分组</Link></Menu.Item>
                            <Menu.Item key="按时段分组"><Link to='/Home/TimeComponent'>按时段分组</Link></Menu.Item>
                            <Menu.Item key='平均耗时统计'><Link to='/Home/AcerageComponent'>平均耗时统计</Link></Menu.Item>
                            <Menu.Item key="错误日志"><Link to="/Home/Errorlog">错误日志</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="测试"
                            title={<span><Icon type="hourglass" /><span>测试</span></span>}
                        >
                            <Menu.Item key="自动化测试"><Link to='/Home/Test'>自动化测试</Link></Menu.Item>
                            <Menu.Item key="711">Team 2</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 6px' }}>
                        <Row gutter={2} style={{ margin: '6px 0' }}>
                            <Col span={20}>
                                <Breadcrumb>
                                    <Breadcrumb.Item>{this.state.BreadcrumbSub}</Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.state.BreadcrumbKey}</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                            <Col span={4}>
                                <Tag color="gold">{this.state.name}欢迎使用DEV工具</Tag>
                                <Button onClick={() => { this.props.history.push('/') }}>登出</Button>
                            </Col>
                        </Row>
                        <div style={{ padding: 5, background: '#fff', minHeight: 560 }}>
                            <Route path='/Home/Action/:id' component={Action}></Route>
                            <Route path='/Home/Windows/:id' component={Windows}></Route>
                            {/* <Route path='/Home/Simple/:id' component={Simple}></Route> */}
                            <Route path='/Home/PVComponent' component={PVComponent}></Route>
                            <Route path='/Home/TimeComponent' component={TimeComponent}></Route>
                            <Route path="/Home/Errorlog" component={Errorlog}></Route>
                            <Route path='/Home/AcerageComponent' component={AcerageComponent}></Route>
                            <Route path='/Home/Bill/:id' component={Bill}></Route>
                            <Route path='/Home/AsyncData/:id' component={AsyncData}></Route>
                            <Route path='/Home/PopWindows/:id' component={PopWindows}></Route>
                            <Route path='/Home/Test' component={Test}></Route>
                            <Route path='/Home/SQLManage/:id' component={SQLManage}></Route>
                            <Route path='/Home/TableUpdate/:id' component={TableUpdate}></Route>
                            <Route path='/Home/AsyncDataManage/:id' component={AsyncDataManage}></Route>
                            <Route path='/Home/Simple_/:id' component={Simple_}></Route>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center', padding: 10 }}>
                        DEV Design ©2018 Created by L UED
          </Footer>
                </Layout>
            </Layout >
        );
    }
}

export default Home