import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './pages/IndexPage';
import * as serviceWorker from './serviceWorker';
import {  HashRouter as Router} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from "./reducer"
let store = createStore(reducer);

/*
  引入 createStore 函数 将 写好的 reducer 作为参数传入
  生成一个仓库  store , 在使用 Provider 组件将跟组件包裹
  注入全局的 context 实现状态提升

*/ 
     function Home(){
       return(
         <Router>
           <IndexPage></IndexPage>
        </Router>
       )
     }

ReactDOM.render(
  <Provider store={store}>
      <Home/>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
