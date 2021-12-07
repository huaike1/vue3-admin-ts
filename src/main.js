import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//and-design-vue
/* import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css"; */
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
//Axios
import Axios from "axios";
//国际语言
import VueI18n from "./language/index";
import i18n from "./i18n";
//svg全局组件
import SvgIcon from "@/components/SvgIcon";
//svg文件解析
import "./js/svg";

const app = createApp(App);
//注入Axios
app.config.globalProperties.$axios = Axios;

app
  .use(i18n)
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueI18n)
  .component("svg-icon", SvgIcon)
  .mount("#app");
