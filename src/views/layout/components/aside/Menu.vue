<template>
    <a-sub-menu  :key="menu.path">
        <template #title>
            <span class="anticon ">
                 <svg-icon :iconName="menu.meta && menu.meta.icon" className="aside-svg" ></svg-icon>
                <!-- <i class="icon  icon-size-21 mb--5" :class="menu.meta && menu.meta.icon"></i> -->
            </span>
            <span>{{menu.meta && menu.meta.title }}</span>
        </template>
        <template v-if="menu.children.length">
            <template  v-for="item in menu.children">
                <!-- 不存在子级 -->
                <template v-if="!item.hidden">
                    <a-menu-item v-if="!item.children" :key="item.path">
                        <router-link :to="item.path">
                            <svg-icon :iconName="item.meta && item.meta.icon" className="aside-svg" ></svg-icon>
                            <!-- <i class="icon  icon-size-21 mb--5" :class="item.meta && item.meta.icon"></i> -->
                            <span>{{ item.meta && item.meta.title }}</span> 
                        </router-link>
                    </a-menu-item>              
                    <!-- 存在子级 -->
                    <Menu v-else :menu="item" :key="item.path" />
                </template>
            </template>
            
        </template>         
    </a-sub-menu>
</template>
<script> 
//import SvgIcon from "@/components/SvgIcon";
export default {
    name: "Menu",
    components: { /* SvgIcon */ },
    props: {
        menu: {
            type: Object,
            default: () => ({})
        }
    },
    setup() {

    }
}
</script>
<style lang="scss" csoped>
.aside-menu {
    i.icon {  
        margin-right: 5px;
        opacity: .6;
    }
    .ant-menu-submenu-open {
        > div {
            i.icon {  opacity: 1; }
        } 
    }
}
</style>