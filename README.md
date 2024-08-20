# my-project
这是一个类京东购物平台，可以登陆与注册账号，搜索查找，产品详情，放大镜，购买商品，加入购物车，下单，提交订单以及支付等模块。用vue-router控制路由的跳转，vuex对仓库中资源进行统一管理，用swiper展示轮播图，element-UI做弹出框，三级联动对分类进行路由跳转，路由之间的转参query和params，还有选中分类或者搜索都会有面包屑处理，综合与价格的排序，手写的分页器作为全局组件，在搜索页面与我的订单中使用，还有在未登录时与登录时的路由守卫判断，个人中心二级路由展示，图片懒加载，用vee-validate插件进行表单验证，路由懒加载。

## Project中的一些问题和使用技术
### 节流：
在一定范围内重复快速触发，只有一次生效。
throttle实现 lodash插件实现

### 防抖：首页重新加载页面的时候会红色：
因为push的时候需要返回一个promise，所以要重写push和replace方法


### ngrogress，
让请求的时候显示进度条，使用请求拦截器和响应拦截器，在请求的时候显示ngrogress，在响应的时候隐藏ngrogress。


### mock插件的使用
后端没有主页下面的数据，所以我们还像调用接口一样，只不过请求会拦截，从而调用本地资源



### 面包屑
来源有3种：三级联动分类，搜索框，searchSelector子组件中的分类
前两种都只要把相应的categoryName变为undefined，再重新发送请求即可，搜索框多一步，要把input里清空，但搜索框不在同一个组件，所以就要用到兄弟间传参，选用$bus，再第三种，又分售卖的品牌和属性，只要把数据改了，再发一遍请求即可


### 价格排序
使用sort方法，传入一个函数，根据价格进行排序，函数返回-1，0，1，根据返回值进行排序。

### 分页器
使用自定义分页器，传入总页数，当前页数，每页显示的数量，返回一个数组，包含当前页的页码，上一页，下一页，首页，尾页。

### 放大镜
首先绑定一个鼠标悬浮事件，出现一个遮罩层加一个大图，但是这个大图的显示出的大小还是一样的，只不过放大了2倍，然后就是移动的时候对应同时移动了，
用$refs获取DOM，第一让遮罩层跟着鼠标移动，第二相对应放大层的背景图也要移动，但是鼠标向右移时，背景图是向左移2倍，第三约束遮罩层的范围


### 购物车uuid
因为要进购物车，但是未登录的话，后端是不会返回数据的，所以要用uuid生成一个token
新建一个utils，再建一个js文件，判断是还本地已经有了，没有就生成，存在本地存储的同时还要把数据返回
这里把两个方法再单独放一个模块，作为对浏览器中本地存储的操作

### 导航守卫
因为商城项目是要有用户，然后访问对应购物车等每个用户私有的数据的，所以在登录或未登录的时候不能跳转到一些特定的路由去，所以就要用到路由导航守卫。
当用户未登录：
要是去订单，支付，订单详情页面都把路由跳转到登录页面，为了登录之后可以直接访问原本要去的路由，则可以用params参数转到登录页方便跳转。
当用户登录了：
要去登录或者注册页，是不行的，直接去往主页（其实这个需求可以不要）
还有就是因为token是存在浏览器本地的，而name是存在仓库的，所以要判断有token但是没有用户名，有就放行，没有则再获取一下用户信息，但这里要判断一下成功与失败，若是失败的话再要跳转到登录界面，因为你即便有token，但是长时间不登录，后端的数据会更新，从而token会失效

### 个人中心（二级路由，路由懒加载，路由重定位）
{
        name: 'center',
        path: '/center',
        component: () => import('@/pages/Center'),//路由懒加载
        children: [
            {
                path: 'myorder',
                component: () => import('@/pages/Center/myOrder')
            }, {
                path: 'grouporder',
                component: () => import('@/pages/Center/groupOrder')
            }, , {
                path: '',//当路径默认的时候（完全的路径的/center/）
                redirect: '/center/myorder'//重定向到myorder路由
            }
        ]
    },

### 图片懒加载
//引入插件（图片懒加载）
import VueLazyload from 'vue-lazyload'
//引入懒加载的图片
import loadimage from '@/assets/images/111.jpg'
//注册图片懒加载插件
Vue.use(VueLazyload, {
  loading: loadimage,
})


### 表单验证


### 路由懒加载
当路由过多时，可以用路由懒加载，只加载当前路由需要的资源，减少首屏加载时间。

### 解决跨域问题
通过代理的方法解决：devServer 代理功能
vue.confing.js中添加
devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',//访问的接口地址
      }
    }
}

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
