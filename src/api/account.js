import service from "@/utils/request.js";
//获取验证码的地址
export function Send(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/send',
        method: 'post', // default
        data,
    });
}

//检测用户名
export function CheckUsername(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/check',
        method: 'post', // default
        data,
    });
}

/* 账户注册 */
export function Register(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/register',
        method: 'post', // default
        data,
    });
}

/* 账户登录 */
export function Login(data){
    return service.request({
        url: process.env.VUE_APP_APIURL + '/v1/account/login',
        method: 'post', // default
        data,
    });
}







/* 微信支付 */
export function WechatPay(data){
    return service.request({
        url: process.env.VUE_APP_PAY + '/wechat_pay',
        method: 'post', // default
        data,
    });
}
export function GetCode(data){
    return service.request({
        url: '/getCode',
        method: 'post', // default
        data,
    });
}
/* *
 *    账户体系--登录
 */
export function AccountLogin(data){
    return service.request({
        url: process.env.VUE_APP_ACCOUNT_APIURL + '/login/',
        method: 'post', // default
        data,
    });
}
/* *
 *    用户体系 --登录
 */
export function UserList(data){
    return service.request({
        url: process.env.VUE_APP_USER_APIURL + '/list/',
        method: 'post', // default
        data,
    });
}


/* service.request({
    // `url` 是用于请求的服务器 URL
    url: '/user',

    // `method` 是创建请求时使用的方法
    method: 'post', // default
    data: {
        firstName: 'Fred'
    },
}); */