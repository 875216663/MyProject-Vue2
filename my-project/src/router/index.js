//配置路由的地方
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
//引入store
import store from '@/store'

Vue.use(Router)



//重写VueRouter.prototype身上的push方法了，目的是为了解决编程式导航报错的问题   
//确保在任何情况下调用 push 和 replace 方法都不会导致应用程序崩溃。
//通过这种方式，可以更安全地使用 Vue Router 进行编程式导航，而不必担心因为缺少回调函数而导致的错误。

//编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误, 但不会阻止跳转
let originPush = Router.prototype.push;
let originReplace = Router.prototype.replace;
Router.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
Router.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
        this,
        location,
        () => {},
        () => {}
        );
    }
    }

    

//配置路由；
let router = new Router({
    //去掉url中的#
    mode: 'history',
    //配置路由
    routes,

    //滚动行为，y=0表示滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        return {  y: 0 }
      }
})

//全局前置守卫
router.beforeEach(async(to, from, next) => {
  // to and from are both route objects. must call `next`.NEXT是放行函数,next()放行，next('/login')方形到指定的到login页面，next(false)中断当前的导航
  //获取仓库中的token-----可以确定用户是登录了
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //用户登录了
  if (token) {
      //已经登录而且还想去登录------不行  
      if (to.path == "/login" || to.path == "/register") {
          next("/home");
      } else {
          //已经登陆了,访问的是非登录与注册
          //登录了且拥有用户信息放行
          if (name) {
              next();
          } else {
              //登陆了且没有用户信息
              //在路由跳转之前获取用户信息且放行
              try {
                  //获取用户信息
                  await store.dispatch("getUserInfo");
                  next();
              } catch (error) {
                  //token失效从新登录
                  //清除token
                  await store.dispatch("logout");
                  // 回到登录页
                  this.$router.push("/login");
              }
          }
      }
  } else {
      //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
      //未登录去上面这些路由-----登录
      let toPath = to.path;
      if (toPath.includes("/trade") || toPath.includes("/pay") || toPath.includes("/center")) {
          //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
          next("/login?redirect=" + toPath);
          // console.log(toPath);
      } else {
          //去的不是上面这些路由（home|search|shopCart）---放行
          next();
      }
    next();
  }
});

export default router;