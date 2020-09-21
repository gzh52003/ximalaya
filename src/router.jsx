import React,{Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Spin } from 'antd';
import "./router.scss";
import Home from "./pages/Home"


const ConfigRouter = [
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/tom",
        name: "tom",
        component:lazy(() => import("./pages/TOM")) 
    },
    {
        path: "/bill",
        name: "bill",
        component:lazy(() => import("./pages/Bill"))
    },
    {
        path: "/alex",
        name: "alex",
        component:lazy(() => import("./pages/Alex")) 
    },
    {
        path: "/user",
        name: "user",
        component:lazy(() => import("./pages/User")) 
    },
    {
        path: "/admin",
        name: "admin",
        component:lazy(() => import("./pages/Admin"))
    }
]


export default function ReRouter() {
    return (
        // 按需加载
        <Suspense fallback={<div className="example">
        <Spin size="large" /></div>}>
            <Switch>
                {
                    ConfigRouter.map(({path,name,component})=>(
                        <Route path={path} component={component} key={name}/>
                    ))
                }
                <Redirect to="/home" from="/" exact />
            </Switch>
        </Suspense>
    )
}
