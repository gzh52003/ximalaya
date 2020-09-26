import React from 'react'
import { Row, Col, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import "./index.scss";

export default class Index extends React.Component {
    gotoPage = ({ key }) => {
        this.setState({
            current: key
        })
        this.goto(key);
        // this.props.history.replace(path);
    }
    goto = (path) => {
        this.props.history.push(path);
    }
    UNSAFE_componentWillMount() {
        const { pathname } = this.props.location;
        this.setState({
            current: pathname
        })
    }
    render() {
        const username = JSON.parse(localStorage.getItem('currentUser')).data.username
        // const user = ''
        console.log(username)
        return (

            <div>
                <div className="logo">
                </div>
                <Row style={{ backgroundColor: '#001529' }}>
                    <Col span={24} style={{ textAlign: 'right', lineHeight: '64px' }}>
                        {
                            username ? <User user={username} /> : < Button type="link" onClick={this.goto.bind(this, '/login')}>登录</Button>}

                    </Col>
                </Row>
            </div >
        )
    }
}

Index = withRouter(Index);