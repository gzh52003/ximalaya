import React, { useState, useEffect } from 'react'

import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import Mycontext from './Mycontext'
import { Table, Tag, Space, Button, Tooltip, Row, Col, Input } from 'antd';
import { Pagination, message } from 'antd';
import Sea from "./Sea"
import request from '../../utils/request'
import Search from 'antd/lib/input/Search';

const columns = [
    {
        title: '#',
        dataIndex: 'key',
        render: text => <span>{text}</span>,
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: '权限',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => {
            // console.log(text, record)
            // console.log("prop=", props)
            return (
                <Mycontext.Consumer>
                    {values => {
                        // console.log(values)
                        return (
                            <Space size="middle">

                                <Tooltip title="编辑">
                                    <Button type="primary" shape="circle"
                                        icon={<FormOutlined
                                        />} onClick={values.userEdit.bind(null, text._id)} />
                                </Tooltip>
                                <Tooltip title="删除">
                                    <Button type="primary" danger shape="circle"
                                        onClick={values.remove.bind(null, text._id)}
                                        icon={<DeleteOutlined />} />
                                </Tooltip>
                            </Space >)
                    }}

                </Mycontext.Consumer>
            )
        }
    },
];

class UserList extends React.Component {
    // static Mycontext = Mycontext
    state = {
        data: [],
        totol: 0,
        search: '',
    }

    async componentDidMount() {
        this.pageChange()
    }
    // 提示信息 
    success = (msg) => {
        message.success(msg);
    };
    error = (msg) => {
        message.error(msg);
    };
    userEdit = (id) => {
        console.log(this.props)
        this.props.history.push('Edit/' + id)

    }
    pageChange = async (page = 1, size = 8) => {
        // console.log(page, size)
        const { data } = await request.get('/user', { params: { size, page } })
        // console.log(data)
        if (data.code == 1) {
            this.setState({
                data: data.data.data,
                total: data.data.total
            })
        }
    }
    remove = async (_id) => {
        const { data } = await request.delete('/user/' + _id)
        if (data.code === 1) {
            this.success("删除成功")

            this.setState({
                data: this.state.data.filter(item => item._id !== _id)
            })
        } else {
            this.error("删除失败")
        }
        // console.log(data)


    }
    Search = async (values) => {
        // console.log(values)

        const { data } = await request.get('user/search', {
            params: {
                values
            }
        })
        console.log(data)
        if (data.code === 1) {
            this.setState({
                data: data.data,
                total: data.total,
                search: values
            })
        }
    }
    render() {
        // console.log(this.state.data)

        let { data, total, search } = this.state


        data = data.map((item, index) => {

            item.key = index + 1
            return item
        })

        return (
            <Mycontext.Provider value={{ userEdit: this.userEdit, Search: this.Search, remove: this.remove }}>
                <Sea />
                <Table columns={columns} dataSource={data}
                    pagination={{ pageSize: 8, total }}

                    // search 是否存在，如果存在，说明用了 模糊搜索，就不使用 this.pageChange 的换页效果，模糊搜索 返回的是全部匹配的数据，用 组件自带的换页效果即可
                    onChange={search ? "" : this.pageChange}
                // onRow={(record, index) => {
                //     // console.log(record, index)
                // }}
                />
            </ Mycontext.Provider >
        )
    }
}



export default UserList

                // console.log(data

