import React from 'react'
import { Input, Row, Col } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import Mycontext from './Mycontext'
const { Search } = Input;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);

class Sea extends React.Component {
    static contextType = Mycontext
    // 添加静态属性，通过 this.context 可以访问 父组件传递的值

    render() {
        // console.log(this.context)
        return (
            <Row style={{ marginBottom: 20 }}>
                <Col span={12}>
                    <Search
                        placeholder="搜索用户名"
                        enterButton
                        size="large"
                        onSearch={this.context.Search}
                    //模糊搜索，点击搜索按钮时，执行 UserList 组件的Search 方法，并将 value 传递过去
                    /></Col>
            </Row>


        )
    }
}

export default Sea