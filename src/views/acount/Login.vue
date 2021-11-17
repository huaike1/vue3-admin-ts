<template>
  <div class="account">
    <div class="form-wrap">
      <a-form ref="formRef" name="custom-validation" v-bind="layout">
        <label>用户名：</label>
        <a-form-item>
          <a-input type="text" autocomplete="off" />
        </a-form-item>

        <label>密码：</label>
        <a-form-item>
          <a-input type="password" autocomplete="off" />
        </a-form-item>

        <label>密码确认：</label>
        <a-form-item>
          <a-input type="password" autocomplete="off" />
        </a-form-item>

        <a-form-item>
          <Captcha/>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
        <div class="fs-12 text-center">
          <router-link  to="/forget" class="color-white">忘记密码</router-link> |
          <router-link  to="/register" class="color-white">注册</router-link>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import Captcha from "@/components/Captcha";
export default {
  name: "Register",
  components: { Captcha },
  setup(props){

    const fromConfig = reactive({
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
    })

    const data = toRefs(fromConfig);

    onMounted(() =>{})

    return {
      ...data
    }
  } 

};
</script>
<style lang="scss">
@import "./styles.scss";
</style>
