KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调,()=>{}
       this.$router.push({name:'search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{});

第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
//重写VueRouter.prototype身上的push方法了
Router.prototype.push = function(location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产地第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

call和apply的相同点，都可以调用函数一次，可以篡改该函数上下文一次
call和apply的区别，call传递参数用逗号隔开，apply方法执行传递数组



2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件


三级联动在Home search和detail都用到了，所以设置为全局组件

postmen测试接口
如果服务器返回的数据code是字段200，代表服务器返回数据成功
前缀都有api


3)axios二次封装：主要目的是请求拦截，与响应拦截
AJAX:客户端可以'悄悄的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios

跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
接口当中路径都带有/api
baseURL："/api"
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的


4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:

     
   


















