import Vue from 'vue';
import App from './App.vue';
import store from '@/store/index.js';

// 三级联动组件--注册全局组件TypeNav并且引入swiper样式，用于轮播图
import TypeNav from '@/components/TypeNav/index.vue';
Vue.component('TypeNav', TypeNav);

import 'swiper/css/swiper.css';

//注册另一个全局组件Carsousel，轮播图
import Carsousel from '@/components/Carousel/index.vue';
Vue.component('Carsousel', Carsousel);

//主页分页组件--注册全局组件Pagination并且引入分页样式
import Pagination from '@/components/pagnation/index.vue';
Vue.component('Pagination', Pagination);

// 引入路由，注册路由信息
import router from '@/router/index.js';
//引入Mock，用于模拟数据
import '@/mock/mockServe.js';
//统一接受api文件里面全部请求函数的文件
import * as API from '@/api';
//引入element-ui,注册全局组件
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
//第二种写法，挂载到Vue的原型对象上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import atm from '@/assets/1.gif';
//懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:atm
});

Vue.config.productionTip = false;
//引入表单校验插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    //和$bus一样，将API对象挂载到Vue的原型对象上，这样所有的组件都可以通过this.$API获取到API对象
    Vue.prototype.$API = API;
  },
  // 使用路由，注册路由信息：当这里书写了 router，那么所有的组件都可以通过 this.$router 获取到路由信息
  router,
  //组件实例对象的$store属性，指向store对象
  store,
}).$mount('#app');
                         