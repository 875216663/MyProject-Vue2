import Vue from "vue";
import Vuex from "vuex";

//给Vue安装Vuex插件，让所有组件实例对象都可以访问到$store属性
Vue.use(Vuex);

//引入search模块和home模块
import search from "./search";
import home from "./home";
import detail from "./detail";
import shopcart from "./shopcart";
import user from './user';
import trade from './trade';

//暴露Vuex.Store类的实例
export default new Vuex.Store({
  modules: {
    search,
    home,
    detail,
    shopcart,
    user,
    trade
  },
});
