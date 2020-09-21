import React from 'react'
// import AsyncComponent from "./asyncComponent"
import {Route} from "react-router-dom"

export default function SubRouter(props) {
    const {path, component } = props;
    console.log(props,component);
    return (
        <Route path={path} component={component}/>
    )
}
