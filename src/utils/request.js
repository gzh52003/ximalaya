//二次封装axios
import axios from 'axios';

const baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:8080' : 'http://47.115.82.38:8085'
//创建一个新的axios
const request = axios.create({
    baseURL: baseURL + '/api', //基础路径,
    withCredentials: true
    //跨域（验证码）
});
// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request; //将封装好的request导出