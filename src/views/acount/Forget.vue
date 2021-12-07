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
        <a-form-item name="username">
          <label>用户名：</label>
          <a-input
            v-model:value="account_form.username"
            type="text"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item name="password">
          <label>密码：</label>
          <a-input
            v-model:value="account_form.password"
            type="password"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item name="passwords">
          <label>密码确认：</label>
          <a-input
            v-model:value="account_form.passwords"
            type="password"
            autocomplete="off"
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
                :disabled="button_disabled"
                :loading="button_loading"
              >
                {{ button_text }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item>
          <Captcha />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>
            重置密码
          </a-button>
        </a-form-item>
        <div class="fs-size text-center">
          <router-link to="/" class="color-white">登录</router-link> |
          <router-link to="/register" class="color-white">注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import {
  checkPhone,
  checkMail,
  checkPassword as password,
  checkCode as code,
} from "@/utils/verification";
import { onMounted, reactive, toRefs } from "vue";
import Captcha from "@/components/Captcha";
export default {
  name: "Register",
  components: { Captcha },
  setup(props) {
    const checkUsername = async (rule, value, callback) => {
      if (!value) {
        return Promise.reject("请输入用户名");
      } else if (!checkPhone(value) && !checkMail(value)) {
        return Promise.reject("请输入11数字或者正确邮箱！！！");
      } else {
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
        password: "",
        passwords: "",
        code: "",
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
      button_disabled: false,
      sec: 5,
      timer: null,
    });

    const form = toRefs(fromConfig);
    const data = toRefs(dataItem);

    //提交表单
    const handleFinish = (value) => {
      console.log(value);
    };
    //获取验证码
    const getCode = () => {
      //用户名不存在情况
      if (!fromConfig.account_form.username) {
        message.info("用户名不能为空");
        return false;
      }
      //优先判断定时器是否存在
      dataItem.timer && clearInterval(dataItem.timer);
      /*  if (dataItem.timer) {
        clearInterval(dataItem.timer);
      } */

      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        console.log(s);
        dataItem.button_text = " ${s}秒 ";
        console.log(dataItem.button_text);
        if (s <= 0) {
          clearInterval(dataItem.timer);
          dataItem.button_text = "重新获取密码";
        }
      }, 1000);
    };

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
</style>
