import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import animated from 'animate.css'
import router from './router'
import store from './store'

createApp(App).use(ElementPlus, { locale: zhCn, }).use(animated).use(store).use(router).mount('#app')

