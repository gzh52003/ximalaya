import React from 'react'
import { Layout, Breadcrumb } from 'antd';

import RegRouter from "../../router.jsx"

const { Content } = Layout;

export default function index() {
    return (
        <div>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <RegRouter></RegRouter>
            </Content>
        </div>
    )
}
