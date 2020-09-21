import React from 'react'
import {Row,Col,Button } from 'antd';
import { withRouter } from 'react-router-dom';

export default class Index extends React.Component {
    gotoPage = ({ key }) => {
        this.setState({
            current:key
        })
        this.goto(key);
        // this.props.history.replace(path);
    }
    goto = (path)=>{
        this.props.history.push(path);
    }
    UNSAFE_componentWillMount(){
        const {pathname} = this.props.location;
        this.setState({
            current:pathname
        })
    }
    render() {
        return (
            <div>
                <div className="logo" />
                <Row style={{ backgroundColor: '#001529' }}>
                    <Col span={24} style={{ textAlign: 'right', lineHeight: '64px' }}>
                        <Button type="link" onClick={this.goto.bind(this, '/reg')}>注册</Button>
                        <Button type="link" onClick={this.goto.bind(this, '/login')}>登录</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

Index = withRouter(Index);