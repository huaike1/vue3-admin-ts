//国际化语言
import { createI18n } from 'vue-i18n';
const i18n = createI18n({
     locale: 'ch', // 定义默认语言为中文 
     messages: {   
        'ch': require("./ch"),   
        'en': require("./en"),
    }
});

export default i18n;