import React, { Suspense, lazy } from 'react';
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
        path: "home/tom",
        name: "tom",
        component: lazy(() => import("./pages/TOM"))
    },
    {
        path: "home/bill",
        name: "bill",
        component: lazy(() => import("./pages/Bill"))
    },
    {
        path: "home/alex",
        name: "alex",
        component: lazy(() => import("./pages/Alex"))
    },
    {
        path: "home/user",
        name: "user",
        component: lazy(() => import("./pages/User"))
    },
    {
        path: "home/admin",
        name: "admin",
        component: lazy(() => import("./pages/Admin"))
    }
]


export default function ReRouter() {
    return (
        // 按需加载
        <Suspense fallback={<div className="example">
            <Spin size="large" /></div>}>
            <Switch>
                {
                    ConfigRouter.map(({ path, name, component }) => (
                        <Route path={path} component={component} key={name} />
                    ))
                }
                <Redirect to="/home" from="/" exact />
            </Switch>
        </Suspense>
    )
}
