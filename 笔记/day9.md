今日实现：
滚动后返回顶部
排他操作
轮播图
分页器
放大镜

开发组件的步骤：
静态组件（点击商品图片的时候，跳转到详情页面，路由跳转时候需要带上产品的id和详情页面），滚动行为
router里面配置路由
2.api请求接口撰写，请求方式，参数，返回数据格式
vuex状态管理，获取产品详情，新建一个detail模块，并且回到大仓库进行并档
动态组件

如何点击产品后滚轮在顶部？
解决方案：
使用vuex的  ，在router里面设置    
//滚动行为，y=0表示滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        return {  y: 0 }
      }                        


复习:
前端开发三大件:轮播 + 分页 + 日历
1)分页器功能
需要知道一共展示多少条数据
需要知道每一页展示几条数据
需要知道当前是第几页
需要知道连续页码数

2)详情模块注意事项
vuex:时不时会有假报错现象

分页器封装原理
知道当前页码，总页码，每页展示条数，总数据量，可以计算出总页码，当前页码的上一页和下一页



3)详情模块开发之商品属性的开发
排他操作：在工作中经常使用-----千万别忘记
排他操作需要获取一个数组，数组中的一个值，遍历数组，把值一致化，然后把其中一个值更改，完成排他操作。
售卖属性
[
    {
        attr:'颜色',
        attrValue:['红色','黑色','白色']
    }，

    {
        attr:'尺寸',
        attrValue:['S','M','L']
    }，

    {
        attr:'重量',
        attrValue:['1KG','2KG','3KG']
    }，
]





4)注意
在工作中假报错现象很常见，因为什么导致的，尽可能解决掉-----【不解决掉对于你的程序没有任何影响】





5)放大镜的功能
----插件:插件解决可以【巧劲】

5.1遮罩层为什么能动。
获取节点（DOM：必须要定位），通过JS动态修改left|top、定位元素才有left、top属性





6)产品个数业务
以后项目当中：凡是出现文本框【用户输入：一定有'幺蛾子',思考情况一定要多思考】
不能是字符串，不能是负数





7)加入购物车的业务?  购物车项目第二个重要地方
购物车：每一个人都有属于自己的购物车，那为什么不同用户登录自己账号，可以看见属于自己产品
一定是用户点击加入购物车，把你的产品信息提交给服务器进行保存，当你下次在进入购物车的时候，
需要向服务器发请求，获取你购物车里面的信息展示

项目：点击加入购物车按钮的时候，以前经常进行路由跳转【调到另外一个路由】，
但是你要注意，点击加入购物车这个按钮的时候，将用户选择产品，提交给服务器进行存储，如果服务器存储成功，
之后在进行路由跳转






面试题：GET与POST
相同点：都是HTTP协议。
不同点:
1:GET请求携带参数是有上限的 post请求携带的参数是没有'上限的'
2:GET请求相对而言不安全，POST安全


面试题:H5新增那些特性？
CSS4、本地存储、多媒体、canvas，浏览器存储功能


面试题：本地存储与会话存储区别？
本地存储：存储在用户浏览器上的数据，可以永久保存，除非手动清除。存储有上限，一般不超过2.5MB。
会话存储：存储在用户浏览器上的数据，浏览器关闭后，数据会被清除。



本项目使用的会话存储，只展示一次






