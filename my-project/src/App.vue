<template>
  <div>
    <Header />
    <!-- 路由组件出口的地方，是根据src/router/index.js文件中的对应位置展示相应的组件-->
    <router-view></router-view>
    <!-- 目的是在Home与Search可见的，但是Login|Register不可见 -->
    <!-- 使用$route.path解决当前问题，在路由中配置 -->
    <!-- <Footer v-show="$route.path=='/home'|| $route.path=='/search'"></Footer> -->
    <!-- 利用路由元信息解决当前问题好处：一行代码就可以解决 -->
    <Footer v-show="$route.meta.isShow" />
  </div>
</template>

<script>
//引入Header与Footer非路由组件
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action||获取商品分类的三级列表的数据
    //放在这里是因为，可以只请求一次，不需要每次都请求
    this.$store.dispatch("categoryList");
    // console.log(this.$store.state.home.categoryList);
  },
};
</script>

<style scoped></style>
