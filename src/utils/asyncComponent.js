import React , {Component} from 'react'

export default function AsyncComponent(importComponent) {
    return class AsyncCompments extends Component{
         state = {
             component : null
         }

         async componentDidMount(){
             const result = await importComponent()
            //  console.log("result=", result);
         }
    }
}
