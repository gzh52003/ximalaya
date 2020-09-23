import React, { Component } from "react"
import { Layout } from 'antd';
import Headers from "../component/Header"
import Sider from "../component/Sider"
import Content from "../component/Content"
import "./IndexPage.scss"


const { Header } = Layout;

class IndexPage extends Component {
    render() {
        return (
            < Layout className="ant-layout-li" >
                <Header className="header">
                    <Headers></Headers>
                </Header>
                <Layout>
                    {/* 侧边导航 */}
                    <Sider></Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* 面包屑导航 */}
                        <Content></Content>
                    </Layout>
                </Layout>
            </Layout >
        )
    }
}

export default IndexPage;