import React, { Component } from 'react';
import logo from '../../logo.svg'
import { Form, Icon, Input, Button, notification } from 'antd';
import './Login.css'
import { LoginAPI } from '../../Math/APIconfig'
import { getTimeFetch } from '../../Math/Math'
const FormItem = Form.Item;
const widthform = {
    width: 400,
    margin: 'auto'
}
class Logins extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // console.log(err)
            if (!err) {
                getTimeFetch(LoginAPI(values.userName, values.password).Login, (res) => {
                    console.log(res)
                    if (res === 'True') {
                        let path = {
                            pathname:'/Home',
                            state:values
                        }
                        this.props.history.push(path)
                    } else {
                        notification.warning({
                            message: '用户名或密码错误',
                            description: res
                        })
                    }
                })
                console.log('Received values of form: ', values);

            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <Form onSubmit={this.handleSubmit} className="login-form" style={widthform}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" autoComplete='false'/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登入
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

const Login = Form.create()(Logins);
export default Login;