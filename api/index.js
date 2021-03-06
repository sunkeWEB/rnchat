import server from './../utils/request';

/**
 * @param url  函数的名称
 * @param method 请求类型 默认 GET
 * @param data 求情参数 默认{}
 * @constructor
 */
export default function AxiosFn(url,data={},method='GET',pp="http://192.168.31.24:9093/") {
    let option = {url:pp+url,method};
    method === 'GET' ? option = {...option, params: data} : option = {...option,method,data};
    return server(option);
}