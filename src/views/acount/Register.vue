<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="formRef"
        name="custom-validation"
        v-bind="layout"
        :rules="rules_form"
        :model="account_form"
        @finish="handleFinish"
      >
        <a-form-item name="username" ref="username">
          <label>用户名：</label>
          <a-input
            v-model:value="account_form.username"
            type="text"
            :disabled="input_disabled.username"
            autocomplete="off"
            @change="() => {$refs.username.onFieldChange()}"
          />
        </a-form-item>

        <a-form-item  name="password" ref="pws">
          <label>密码：</label>
          <a-input-password 
            v-model:value="account_form.password" 
            type="password" 
            autocomplete="off" 
            placeholder="请输入密码！！" 
            @change="() => {$refs.pws.onFieldChange()}"
          />
        </a-form-item>

        <a-form-item name="passwords" ref="pwss">
          <label>密码确认：</label>
          <a-input-password 
            v-model:value="account_form.passwords" 
            type="password" 
             
            placeholder="请再次输入密码！！" 
            @change="() => {$refs.pwss.onFieldChange()}"
          />
        </a-form-item>

        <a-form-item name="code">
          <label>验证码：</label>
          <a-row :gutter="15">
            <a-col :span="16"
              ><a-input
                maxlength="6"
                v-model:value="account_form.code"
                type="text"
                autocomplete="off"
            /></a-col>
            <a-col :span="8">
              <a-button
                type="danger"
                @click="getCode"
                :disabled="disabled_code_button"
                :loading="button_loading"
              >
                {{ button_text }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

     
        <a-form-item>
          <a-button type="primary" html-type="submit" block> 注册 </a-button>
        </a-form-item>
        <div class="text-center fs-12">
          |
          <router-link to="/forget" class="color-white">忘记密码</router-link> |
          <router-link to="/" class="color-white">登录</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { CheckUsername, Send, Register } from "@/api/account.js";
import { message } from "ant-design-vue";
import { checkPhone, checkMail, checkPassword as password, checkCode as code} from "@/utils/verification";
import { onMounted, reactive, toRefs } from "vue";
import Captcha from "@/components/Captcha";
import { useRouter } from "vue-router";
//加密
import { getAES, getDAes } from "@/utils/crypto.js";
export default {
  name: "Register",
  components: { Captcha },
  setup(props) {
    const { replace } = useRouter();
    const checkUsername = async (rule, value, callback) => {
      if (!value) {
        dataItem.disabled_code_button = true;
        return Promise.reject("请输入用户名");
      } else if (!checkPhone(value) && !checkMail(value)) {
        dataItem.disabled_code_button = true;
        return Promise.reject("请输入11数字或者正确邮箱！！！");
      } else {
        //checkUsernameFn()
        dataItem.disabled_code_button = false;
        return Promise.resolve();
      }
    };
    //校验密码
    const checkPassword = async (rule, value, callback) => {
      const passwords = fromConfig.account_form.passwords;
      if (value === "") {
        return Promise.reject("请输入密码！！！");
      } else if (!password(value)) {
        return Promise.reject(
          "密码必须由字母、数字组成，区分大小写,密码长度为8-18位"
        );
      } else if (passwords && value && passwords !== value) {
        return Promise.reject("两次密码不一致！！！");
      } else {
        return Promise.resolve();
      }
    };
    //重置密码
    const checkPasswords = async (rule, value, callback) => {
      const pas = fromConfig.account_form.password;
      if (value === "") {
        return Promise.reject("请再次输入密码！！！");
      } else if (!password(value)) {
        return Promise.reject(
          "密码必须由字母、数字组成，区分大小写,密码长度为8-18位"
        );
      } else if (pas && value && pas !== value) {
        return Promise.reject("两次密码不一致！！！");
      } else {
        return Promise.resolve();
      }
    };
    //验证码
    const checkCode = async (rule, value, callback) => {
      const cod = fromConfig.account_form.code;
      if (value === "") {
        return Promise.reject("请输入验证码！！！");
      } else if (!code(value)) {
        return Promise.reject("请输入六位数字或者英文");
      } else {
        return Promise.resolve();
      }
    };

    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      account_form: {
        username: "",
        password: "phf16899199",
        passwords: "phf16899199",
        code: "123456",
      },
      input_disabled: {
        username: false,
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }],
        passwords: [{ validator: checkPasswords, trigger: "change" }],
        code: [{ validator: checkCode, trigger: "change" }],
      },
    });

    //
    const dataItem = reactive({
      //获取验证码
      button_text: "获取验证码",
      button_loading: false,
      disabled_code_button: true,
      sec: 0,
      timer: null,
    });

    const form = toRefs(fromConfig);
    const data = toRefs(dataItem);

    //提交表单
    const handleFinish = (value) => {
      const requestData = {
        username: fromConfig.account_form.username,
        password: getAES(fromConfig.account_form.password),
        code: fromConfig.account_form.code,
      }
      Register(requestData).then(response => {
        const code = response.content.code;
        /* const msg = code ? "注册成功！" : response.msg;
        message.success(msg); */
        if (code) {
          message.success("注册成功！")
          setTimeout(() => {
            replace({
              name: "Login"
            })
          }, 5000);
        }else{
          message.info(response.msg);
          return false;
        }
      }).catch(error => {

      })
    };
    //获取验证码
    const getCode = async () => {

      const usernameStatus = await checkUsernameFn();
      if (usernameStatus) { return false; }

      //用户名不存在情况
      dataItem.button_loading = true;
      dataItem.button_text = "发送中！！！";
      //接口请求
      Send({ username: fromConfig.account_form.username, type: "Registe" }).then(response => {
        //俺就加载取消
        dataItem.button_loading = false;
        //按钮禁用
        dataItem.disabled_code_button = true;
        countDown();
      })
     
    };

    //倒计时
    const countDown = () => {
      dataItem.sec  = process.env.VUE_APP_COUNTDOWN;
       //优先判断定时器是否存在
      dataItem.timer && clearInterval(dataItem.timer);
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = "重新获取";
          //按钮禁用
          dataItem.disabled_code_button = false;
        }
      }, 1000);
    }

    //检测用户名是否存在
    const checkUsernameFn = () => {
      fromConfig.input_disabled.username = true;
      return CheckUsername({ username: fromConfig.account_form.username }).then(response => {
        const user_status = response.content.user
        dataItem.disabled_code_button = user_status;
        fromConfig.input_disabled.username = false;
        if (user_status) {
          message.error(response.msg);
        }
        return user_status;
      }).catch(error => {
         fromConfig.input_disabled.username = false;
      })
    }

    onMounted(() => {});

    return {
      ...form,
      ...data,
      handleFinish,
      getCode,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./styles.scss";
@import "../../styles/main.scss";
</style>
