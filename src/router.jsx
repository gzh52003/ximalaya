import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import { Spin } from 'antd';
import "./router.scss";

import Home from "./pages/Home"
let Tom = lazy(() => import("./pages/TOM"))
let Bill = lazy(() => import("./pages/Bill"))
let Alex = lazy(() => import("./pages/Alex"))
let User = lazy(() => import("./pages/User"))
let Admin = lazy(() => import("./pages/Admin"))



const ConfigRouter = [
    {
        path: "/home",
        name: "home",
        component: Home
    },
    {
        path: "/home/tom",
        name: "tom",
        // component: lazy(() => import("./pages/TOM"))
        component: Tom
    },
    {
        path: "/home/bill",
        name: "bill",
        // component: lazy(() => import("./pages/Bill"))
        component: Bill
    },
    {
        path: "/home/alex",
        name: "alex",
        // component: lazy(() => import("./pages/Alex"))
        component: Alex
    },
    {
        path: "/home/user",
        name: "user",
        // component: lazy(() => import("./pages/User"))
        component: User
    },
    {
        path: "/home/admin",
        name: "admin",
        // component: lazy(() => import("./pages/Admin"))
        component: Admin
    }
]


let authenticate = ()=> {
    const token = localStorage.getItem("currentUser");
    return token ? true : false;
}

export default function ReRouter() {
    return (
        // 按需加载
        <Suspense fallback={<div className="example">
            <Spin size="large" /></div>}>
            <Switch>
                {
                    ConfigRouter.map(({ path, name, component : Component }) => (
                        <Route key={name} path={path} exact render ={props=> authenticate() ? <Component {...props} /> 
                         : <Redirect to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }} />
                    } /> 
                    ))
                        /*<Route path={path} component={component} key={name} exact />*/ 
                }
                {/* 这个重定向必要的 */}
                <Redirect to="/home" from="/" exact />
            </Switch>
        </Suspense>
    )
}
