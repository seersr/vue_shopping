import axios from 'axios'
import apiService from './Api'
import {
    Toast
} from 'vant'

/**
 *  axios 实例
 */
let instance = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 1000
})

const Http = {} //包裹请求方法的容器

/**
 * apiService 循环遍历输出不同的请求方法
 * 请求格式 参数统一
 */
for (let key in apiService) {
    let api = apiService[key] //得到apiService里的对象

    //async 作用：避免进入回调地狱
    Http[key] = async function (
        params, //请求参数
        isFormData = false, //标记是否是form-data请求  默认不是
        config = {} //配置参数
    ) {
        let newParams = {} //新的请求参数

        // 判断content-type是否是 form-data
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }

        /**
         * 不同请求的判断
         */
        let response = {} //请求的返回值
        if (api.method === 'get') {
            try {
                response = await instance[api.method](api.url, config)
            } catch (error) {
                response = error
            }
        } else if (api.method === 'post') {
            try {
                response = await instance[api.method](api.url, newParams, config)
            } catch (error) {
                response = error
            }
        }
        
        return response
    }
}


/**
 * 拦截器
 */
//请求拦截器
instance.interceptors.request.use(config => {
    // 发起请求前做些什么
    Toast.loading({
        mask: false,
        duration: 0, // 一直存在
        forbidClick: true, // 禁止点击
        message: '加载中...'
    })
    return config
}, (err) => {
    console.log(err)
    //请求错误
    Toast.clear()
    Toast('请求错误，请稍后重试')
})

//响应拦截器
instance.interceptors.response.use(res => {
    Toast.clear()
    return res.data
}, err => {
    console.log(err)
    Toast.clear
    Toast('响应错误，请稍后重试')
})
export default Http