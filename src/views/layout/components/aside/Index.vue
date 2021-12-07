<template>
  <h1 id="logo">
    <img v-if="collapsed" :src="data.logo_min" alt="西安地铁" />
    <img v-else :src="data.logo" alt="西安地铁" />
  </h1>
  <a-menu
      class="aside-menu"
      mode="inline"
      theme="dark"
      v-model:openKeys="data.openKeys"
      v-model:selectedKeys="data.selectedKeys"
      @click="selectMenu"
      @openChange="openMenu"
    >
      <template  v-for="item in routers">
        <template v-if="!item.hidden">
          <!-- 一级菜单 -->
          <a-menu-item v-if="hasOnlyChildren(item)" :key="item.path">
            <router-link :to="item.children[0].path">
              <span class="anticon ">
                <svg-icon :iconName="item.meta && item.meta.icon" className="aside-svg" ></svg-icon>
              </span>
              <!-- <i class="icon icon-aside-home icon-size-21 mb--5" :class="item.meta && item.meta.icon"></i> -->
              <span>{{item.children[0].meta && item.children[0].meta.title }}</span>  
            </router-link>
          </a-menu-item> 
          <!-- 子级菜单 -->
          <Menu v-else :menu="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
</template>
<script>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import  Menu  from "./Menu";
//import SvgIcon from "@/components/SvgIcon";
export default {
  name: "Aside",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    } 
  },
  components: { Menu, /* SvgIcon */ },
  setup() {
    const { options } = useRouter();
    //路由
    const routers = options.routes;

    const data = reactive({
      collapsed: false,
      selectedKeys: localStorage.getItem("selectedKeys") ? [localStorage.getItem("selectedKeys")] : [],
      openKeys: localStorage.getItem("openKeys") ? [JSON.parse(localStorage.getItem("openKeys"))] : [],
      logo: require("@/assets/images/logo.png"),
      logo_min: require("@/assets/images/logo_min.png")
    });
    //选择菜单
    const selectMenu = ({ item, key, keyPath }) => {
      data.selectedKeys = [key];
      localStorage.setItem("selectedKeys", key)
    };
    //展开、关闭菜单
    const openMenu = (openKeys) => {
      data.openKeys = openKeys; 
      console.log();
      localStorage.setItem("openKeys", JSON.stringify(openKeys))

    }

    //检测是否只有一个子路由
    const hasOnlyChildren = (data) => {
      //不存在子级 
      if (!data.children) { return false; }
      //存在子级情况
      const routers = data.children.filter(item => item.hidden ? false : true);
      // 判断最终结果
      if (routers.length === 1) { return true; }
      return false;
    }
  

    return {
      data,
      routers,
      selectMenu,
      openMenu,
      hasOnlyChildren
    }
  }
};
</script>
<style lang="scss" scoped>
#logo {
  padding: 24px 0 20px;
  border-bottom: 1px solid red;
  text-align: center;
  img { display: inline-block; }
}
.aside-menu {
  i.icon {  
        margin-right: 10px;
        opacity: .6;
  }
  .ant-menu-item-selected {opacity: 1;}
}
</style>
