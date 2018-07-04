import axios from 'axios';

const service = axios.create({
    timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    alert("interceptors");
    // if (Cookies.get('token')) {
    //     config.headers['authorization'] = "Bearer " + Cookies.get('token');
    // }
    return config
}, error => {
    console.log("error1",error);
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
    response => {
        alert("response");
        const res = response.data;
        console.log(res);
        //2是登录成功  888 验证通过 3 修改
        if (res.code === 0 || res.code === 1 || res.code === 2 || res.code === 3 || res.code === 888) {
            if (res.code === 2 || res.code===3) {  // 获取数据成功就不显示消息弹出
            }
            return response.data;
        } else {
            return Promise.reject('error');
        }
    },
    error => {
        alert("网络错误");
        console.log("error2",error);
        return Promise.reject(error)
    }
);

export default service