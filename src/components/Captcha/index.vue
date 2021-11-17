<template>
  <div class="captcha-wrap">
    <div id="captcha-dom" class="nc-container"></div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import "./captcha.js"
export default {
    name: "Captcha",
    setup() {
        onMounted(() =>{
            var nc_token = ["FFFF0N0000000000A524", (new Date()).getTime(), Math.random()].join(':');
            var nc=NoCaptcha.init({
                renderTo: '#captcha-dom',
                appkey: 'FFFF0N0000000000A524', 
                scene: 'nc_login_h5',
                token: nc_token,
                trans: {"key1": "code200"},
                elementID: ["usernameID"],
                is_Opt: 0,
                language: "cn",
                timeout: 10000,
                retryTimes: 5,
                errorTimes: 5,
                inline:false,
                apimap: {
                    // 'analyze': '//a.com/nocaptcha/analyze.jsonp',
                    // 'uab_Url': '//aeu.alicdn.com/js/uac/909.js',
                },
                bannerHidden:false,
                initHidden:false,
                callback: function (data) {
                    window.console && console.log(nc_token)
                    window.console && console.log(data.csessionid)
                    window.console && console.log(data.sig)
                },
                error: function (s) {
                }
            });
            NoCaptcha.setEnabled(true);
            nc.reset();//请务必确保这里调用一次reset()方法

            NoCaptcha.upLang('cn', {
                'LOADING':"加载中...",//加载
                'SLIDER_LABEL': "请向右滑动验证",//等待滑动
                'CHECK_Y':"验证通过",//通过
                'ERROR_TITLE':"非常抱歉，这出错了...",//拦截
                'CHECK_N':"验证未通过", //准备唤醒二次验证
                'OVERLAY_INFORM':"经检测你当前操作环境存在风险，请输入验证码",//二次验证
                'TIPS_TITLE':"验证码错误，请重新输入"//验证码输错时的提示
            });
        })

    }

}
</script>

<style lang="scss" scoped>
//有问题
.captcha-wrap {
    .nc-container #nc_1-stage-1 { width: auto !important;}
    .nc-container .nc_scale span { height: auto;}
    .nc-container .nc_scale .btn_ok { line-height: 32px;}
}

</style>

