import React, { Component } from 'react'
import { PayCircleOutlined, CommentOutlined, ShoppingCartOutlined, SoundOutlined, FieldTimeOutlined } from '@ant-design/icons';
import { Row, Col, Table } from 'antd';
import request from '../../utils/request';
// 引入 ECharts 主模块
import echarts from 'echarts'
// import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


import "./index.scss"

const result = [
    {
        color: "#60A7D0",
        bgcolor: "rgb(67, 142, 185)",
        plugin: <PayCircleOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "成交金额",
        sum: "9578.00",
        rem: "元"
    },
    {
        color: "#9CD159",
        bgcolor: "rgb(114, 182, 63)",
        plugin: <CommentOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "留言",
        sum: "4567",
        rem: "条"
    },
    {
        color: "#72B63F",
        bgcolor: "rgb(255, 87, 87)",
        plugin: <ShoppingCartOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "订单",
        sum: "7890",
        rem: "笔"
    },
    {
        color: "#FF7171",
        bgcolor: "rgb(255, 102, 51)",
        plugin: <SoundOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "通知",
        sum: "578",
        rem: "条"
    },
    {
        color: "#FF8E68",
        bgcolor: "rgb(135, 117, 167)",
        plugin: <FieldTimeOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "待处理",
        sum: "18",
        rem: "条"
    },
    {
        color: "#AD96D6",
        bgcolor: "rgb(245, 194, 61)",
        plugin: <FieldTimeOutlined style={{ color: "#fff", fontSize: "20px" }} />,
        text: "紧急通知",
        sum: "8",
        rem: "条"
    }
];

const columns = [
    {
        title: '出品',
        width: 200,
        dataIndex: 'anchor',
    },
    {
        title: '商品编号',
        width: 140,
        className: 'column-money',
        dataIndex: 'id',
        align: 'left',
    },
    {
        title: '类型',
        width: 140,
        dataIndex: 'categoryName',
    },
    {
        title: '商品名称',
        width: 400,
        dataIndex: 'title',
    },
    {
        title: '销售数量',
        dataIndex: 'includeTrackCount',
        sorter: {
            compare: (a, b) => a.includeTrackCount - b.includeTrackCount,
            multiple: 1,
          },
    },
];
// https://www.ximalaya.com/revision/play/v1/audio?id=46106992&ptype=1
// https://www.ximalaya.com/revision/play/v1/audio?id=45982332&ptype=1
// const data = [
//     {
//         key: '1',
//         name: 'lijie',
//         money: '970507',
//         address: 'New York No. 1 Lake Park',
//         order: "21"
//     },
//     {
//         key: '2',
//         name: 'youyou',
//         money: '970507',
//         address: 'London No. 1 Lake Park',
//         order: "23"
//     },
//     {
//         key: '3',
//         name: '二傻',
//         money: '970507',
//         address: 'Sidney No. 1 Lake Park',
//         order: "25"
//     },
// ];

export default class index extends Component {
    state = {
        data : null
    }

    componentDidMount() {
        var myChart = echarts.init(this.store);

        myChart.setOption({
            title: {
                text: '当周交易记录',
                subtext: '每周7天的交易记录'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['所有订单', '已完成', '未完成']
            },
            toolbox: {
                show: true,
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}单'
                    }
                }
            ],
            series: [
                {
                    name: '所有订单',
                    type: 'line',
                    data: [110, 110, 150, 130, 125, 133, 106],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: '已完成',
                    type: 'line',
                    data: [110, 105, 140, 130, 110, 121, 100],
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                },
                {
                    name: '未完成',
                    type: 'line',
                    data: [0, 5, 10, 0, 15, 12, 6],
                    markPoint: {
                        data: [
                            { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
                        ]
                    },
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }
            ]
        });
       
        this.getResult();
    }
    
    getResult = async ()=>{
        const {data:{data : getState}} = await request.get('/goods')
        this.setState({
            data : getState
        })
    }

    render() {
        console.log(this.state.data)
        return (
            <div>
                <section className="spacing">
                    {
                        result.map(({ color, bgcolor, plugin, text, sum, rem }, index) => (
                            <div className="spacing-box" key={index}>
                                <div className="box_left" style={{ backgroundColor: color }} >
                                    {plugin}
                                    <p>{text}</p>
                                </div>
                                <div className="M_info" style={{ backgroundColor: bgcolor }}>
                                    {sum + rem}
                                </div>
                            </div>
                        ))
                    }
                </section>


                <Row>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            rowKey={record => record._id}
                            dataSource={this.state.data}
                            scroll={{ x: 1166, y: 300 }}
                            bordered
                            title={() => '商品销售排行'}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <div ref={el => this.store = el} style={{ width: 1100, height: 400 }}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
