import React from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Modal } from 'antd';
import request from '../../utils/request'
import './index.scss'



class Login extends React.Component {
    state = {
        vcode: ''
    }
    componentDidMount() {

        this.getVcode()
    }
    info(msg) {
        Modal.info({
            title: msg.title,
            content: (
                <div>
                    <p>{msg.context}</p>
                </div>
            ),
            onOk() { },
        });
    }
    // 获取验证码
    getVcode = async () => {
        const { data: { data } } = await request.get('/vcode')
        // console.log(data)
        this.setState({
            vcode: data
        })
        // console.log(this.state.vcode)
    }
    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        const onFinish = async values => {
            const {
                username,
                password,
                vcode,
                checked } = values
            // console.log('Success:', values);
            // console.log(request)
            const { data } = await request.post('/login', {

                username,
                password,
                vcode: vcode.toLowerCase(),
                // 验证码转成小写
                checked,

            })
            // console.log(data)
            if (data.code === 10) {
                this.info({ title: "验证码错误", context: '请输入正确的验证码' })
            } else if (data.code === 0) {
                this.info({ title: "用户名或密码错误", context: '请输入正确的用户密码' })
            } else if (data.code === 1) {
                // console.log(this)
                localStorage.setItem('currentUser',
                    JSON.stringify(data))
                this.props.history.push('/home')

            }
        };
        return (
            <Form
                {...layout}
                name="normal_login"
                className="login-form"
                initialValues={{ remember: false }}
                onFinish={onFinish}

            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="验证码" >
                    <Row gutter={8}>
                        <Col span={12}>
                            <Form.Item
                                name="vcode"
                                noStyle
                                rules={[{ required: true, message: '请输入验证码!' }]}
                            >

                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <span onClick={this.getVcode} dangerouslySetInnerHTML={{ __html: this.state.vcode }}></span>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailLayout} name="checked" valuePropName="checked">
                    <Checkbox>七天免登录</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>

            </Form >
        );
    }
}

export default Login


