<template>
   <div id="header">
       <div class="collapsed-button" @click="collapsedButton">
           <svg-icon iconName="collapsed" class="collapsed-svg"></svg-icon>
       </div>
       <div class="header-menu">
           <a-dropdown :trigger="['hover']">
                <a class="ant-dropdown-link" @click.prevent>
                    <!-- <img src="../../../assets/icon/aside-user.png" /> -->
                    <img :src="data.tou" alt="">
                </a>
                <template #overlay>
                <a-menu>
                    <a-menu-item key="0">
                        <div class="menu-item ">
                            <svg-icon iconName="user1" className="header-menu-svg"></svg-icon>
                            huai1066@163.com
                        </div> 
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="1">
                        <div class="menu-item menu-lang">
                            <svg-icon iconName="lang" className="header-menu-svg"></svg-icon>
                            <span 
                                v-for="item in data.lang" 
                                :key="item.value" 
                                @click="toggleLang(item.value)"
                                :class="{'current': data.lang_current == item.value}"
                            >
                                {{item.label}}
                            </span>
                        </div>                  
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="3" disabled>
                        <div class="menu-item">
                            <svg-icon iconName="exit" className="header-menu-svg"></svg-icon>
                            {{ $t("header_menu.logout")}}
                        </div> 
                    </a-menu-item>
                </a-menu>
                </template>
            </a-dropdown>
       </div>
   </div>

</template>
<script>
import { reactive, getCurrentInstance } from "vue";
import { useI18n } from 'vue-i18n';
export default {
    name: "Header",
    setup() {
        const { emit } = getCurrentInstance();
        //扩展语言
        const { locale } = useI18n({ useScope: 'global' });
        const data = reactive({
            lang: [
                { label: "中文", value: "ch" },
                { label: "En", value: "en" },
            ],
            lang_current: "ch",
            tou: require("@/assets/icon/aside-user.png"),
        });
        //语言转换
        const toggleLang = (lang) => {
            locale.value  = lang;
            data.lang_current = lang;
        };
        //
        const collapsedButton = () => {
             emit("collapsed", { aa:"11", bb:"11"})
        }
        return {
            data,
            toggleLang,
            collapsedButton
        }
    }

}
</script>
<style lang="scss" scoped>
    #header {
        padding: 0 20px;
        height: 64px;
    }
    .header-menu {
        float: right;
        margin-top: 15px; 
    }
    .menu-item {
        padding: 0px 20px;
        font-size: 14px;
        font-family: "黑体";
        color: #333333;
        
    }
    .menu-lang {
        color:  green
        span { margin-right: 10px; }
        .current { color: red }
    }
    .collapsed-button {
        float: left;
        cursor: pointer;
        font-size: 20px;
    }
    .ant-dropdown-link {
        width: 20px;
        height: 21px;
    }

</style>