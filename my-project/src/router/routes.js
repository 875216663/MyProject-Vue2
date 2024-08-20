//引入组件
import Home from "@/pages/Home";
import Search from "@/pages/search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import paySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";

/* 
component: foo = () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
    初始时函数不会执行, 第一次访问对应的路由才会执行, 也就是说只有一次请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高首屏的加载速度
*/

export default [
  {
    path: "/home",
    component: Home,
    //按需加载，懒加载
    // component: () => import("@/pages/Home"),
    meta: { isShow: true },
  },
  {
    path: "/search/:keyword?",
    component: Search,
    //用来设置footer要不要存在
    meta: { isShow: true },
    name: "search",
    //将params参数映射成props传递给路由组件,三种写法
    // props: true、
    // props: {name:'zhangsan'}
    // props: ($route) => ({keyword: $route.params.keyword, k: $route.query.k})
  },
  {
    path: "/register",
    component: Register,
    meta: { isShow: false },
  },
  {
    path: "/login",
    component: Login,
    meta: { isShow: false },
  },
  //重定向
  {
    path: "/",
    redirect: "/home",
  },
  //需要占位，因为params参数是必须的，需要带上详情的id
  {
    path: "/detail/:skuid",
    component: Detail,
    meta: { isShow: true },
    name: "detail",
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    meta: { isShow: true },
    name: "addCartSuccess",
  },
  {
    path: "/shopCart",
    component: ShopCart,
    meta: { isShow: true },
  },
  {
    path: "/trade",
    component: Trade,
    meta: { isShow: true },
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    meta: { isShow: true },
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/paySuccess",
    component: paySuccess,
    meta: { isShow: true },
  },
  {
    path: "/center",
    component: Center,
    meta: { isShow: true },
    children: [
      {
        //二级路由不需要加/，加的话要写成/center/groupOrder
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "groupOrder",
        component: GroupOrder,
      },
      //这个是保证一进入center就能看到订单
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
];
