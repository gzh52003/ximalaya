import React from 'react'
import { Layout, Menu } from 'antd';
import { IdcardOutlined, CreditCardOutlined, MessageOutlined, HomeOutlined, DollarOutlined, StarOutlined } from '@ant-design/icons';

import {
    Link
} from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;

export default function index() {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                // console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
            }}
        >

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    {/* replace 去警告 */}
                    <Link to="/home" replace>我的管理</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<DollarOutlined />} title="收益系统">
                    <Menu.Item key="1"><Link to="/home/tom" replace>Tom</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/bill" replace>Bill</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/home/alex" replace>Alex</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<CreditCardOutlined />} title="订单管理">
                    <Menu.Item key="4">Tom1</Menu.Item>
                    <Menu.Item key="5">Bill2</Menu.Item>
                    <Menu.Item key="6">Alex3</Menu.Item>
                </SubMenu>
                <Menu.Item key="7" icon={<MessageOutlined />}>
                    <Link to="/home/user" replace>消息</Link>
                </Menu.Item>
                <Menu.Item key="8" icon={<IdcardOutlined />}>
                    <Link to="/home/admin" replace>售后服务</Link>
                </Menu.Item>
                <Menu.Item key="9" icon={<StarOutlined />}>
                    <Link to="/home/admin" replace>收藏夹</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
