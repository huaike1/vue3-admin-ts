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

        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
        <div class="text-center fs-12">
          <router-link to="/forget" class="color-white">忘记密码</router-link> |
          <router-link to="/register" class="color-white">注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/account.js";
import { message } from "ant-design-vue";
import { checkPhone, checkMail, checkPassword as password, } from "@/utils/verification";
import { onMounted, reactive, toRefs } from "vue";
import Captcha from "@/components/Captcha";
import { useRouter } from "vue-router";
//加密
import { getAES, getDAes } from "@/utils/crypto.js";
import { setToken, setUsername, getToken } from "@/utils/cookies";
export default {
  name: "Login",
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
      }else {
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
      },
      input_disabled: {
        username: false,
      },
      rules_form: {
        username: [{ validator: checkUsername, trigger: "change" }],
        password: [{ validator: checkPassword, trigger: "change" }]
      },
    });

    //
    const dataItem = reactive({ });

    const form = toRefs(fromConfig);
    const data = toRefs(dataItem);

    //提交表单
    const handleFinish = (value) => {
      const requestData = {
        username: fromConfig.account_form.username,
        password: getAES(fromConfig.account_form.password),
      }
      Login(requestData).then(response => {
        const data = response.content;
        setToken({token: data.token});
        setUsername({value: data.username})
         console.log(getToken());      
      })
    }
    
    return {
      ...form,
      ...data,
      handleFinish,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./styles.scss";

</style>
