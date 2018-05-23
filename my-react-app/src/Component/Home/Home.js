import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, Route } from 'react-router-dom'
import Action from '../Action/Action';
import Windows from '../Windows/Windows'
import Simple from '../Simple/Simple';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Home extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
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
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3"><Link to='/Home/Action'>Action</Link></Menu.Item>
              <Menu.Item key="4"><Link to='/Home/Windows'>WindowsAction</Link></Menu.Item>
              <Menu.Item key="5"><Link to='/Home/Simple'>SimpleAction</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 10px' }}>
            <Breadcrumb style={{ margin: '10px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 20, background: '#fff', minHeight: 560 }}>
              <Route path='/Home/Action' component={Action}></Route>
              <Route path='/Home/Windows' component={Windows}></Route>
              <Route path='/Home/Simple' component={Simple}></Route>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home