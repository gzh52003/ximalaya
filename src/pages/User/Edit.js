import React from "react"
import { Form, Input, InputNumber, Button, message, Space } from 'antd';
import request from '../../utils/request'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} 不能为空!',
};

class Edit extends React.Component {
    state = {
        user: {
            username: '66666',
            gender: '',
            role: '',
        }
    }
    success = (msg) => {
        message.success(msg);
    };
    error = (msg) => {
        message.error(msg);
    };
    onFinish = async values => {
        // console.log(this.props);
        const { username, role, gender } = values
        const { id: _id } = this.props.match.params
        let data = {}
        if (_id) {

            data = await request.put('/user/edit/' + _id, { username, role, gender })

        } else {
            data = await request.post('/user/ ', { username, role, gender })
        }
        if (data.data.code === 1) {
            this.success('操作成功')
            this.props.history.push('/home/userList')
        } else {
            this.error("操作失败")
        }
        // console.log(data)
    };
    componentDidMount = async () => {
        // console.log(Form)
        const { id: _id } = this.props.match.params
        console.log(_id)
        if (_id) {
            const { data: { data } } = await request.get('/user', { params: { _id } })
            // console.log(data[0])

            this.form.setFieldsValue(data[0])
        }

    }
    getUser = (values) => {
        return 666
    }
    render() {
        const { user } = this.state
        console.log("666", user)
        return (
            <Form {...layout} name="nest-messages" ref={el => this.form = el} onFinish={this.onFinish} validateMessages={validateMessages}
            >
                <Form.Item name='username' label="用户名" rules={[{ required: true }]} >
                    <Input />
                </Form.Item>
                {/* <Form.Item name={['user', 'password']} label="密码" rules={[{ required: true }]}>
                    <Input />
                </Form.Item> */}
                <Form.Item name='gender' label="性别">
                    <Input />
                </Form.Item>
                <Form.Item name='role' label="权限">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit" >
                        提交
                </Button>
                    <Button type="primary" htmlType="reset" style={{ marginLeft: 20 }}>
                        取消
                </Button>
                </Form.Item>

            </Form >
        );
    }
};

export default Edit