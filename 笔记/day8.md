分页器业务
前端三大件:轮播图、分页、日历。这属于前端开发常见三种业务

为什么很多项目中都采用分页功能?
比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。
数据多的时候，可以选择分页，比如每一次只是展示10

拆分分页组件（静态组件），注册为全局组件，因为其他模块也在使用分页功能。


分页器封装业务分析:
封装分页器组件的时候：需要知道哪些条件？
假如你知道条件1、条件2：知道一共多少页 100/3
1:分页器组件需要知道我分页器一共展示多少条数据 ----total【100条数据】

2:每一个需要展示几条数据------pageSize【每一页3条数据】

3:需要知道当前在第几页-------pageNo[当前在第几页]

4:需要知道连续页码数【起始数字、结束数字：连续页码数是当中的页码数一般5、7、9】奇数，对称好看 continues
计算方法 连续页面当前页码在最中间，前面俩数字，后面俩数字

已经条件: total=【99】  pageSize =【3】  pageNo=6    continues 5 

4 5 6 7 8


已经条件: total=【99】  pageSize =【3】  pageNo= 1    continues 5 

错误:-1 0 1 2 3
正确: 1 2 3 4 5

已经条件: total=【99】  pageSize =【3】  pageNo= 2    continues 5 

错误: 0 1 2 3 4 
正确：1 2 3 4 5 

已经条件: total=【99】  pageSize =【3】  pageNo= 33    continues 5 

错误: 31 32  33 34 35
正确：29 30  31 32 33 



已经条件: total=【99】  pageSize =【3】  pageNo= 32    continues 5 

错误：30 31 32 33 34 
正确: 29 30  31 32 33 
分页器动态展示：
v-for ：数组|数字|字符串|对象

3)分页器封装
3.1进行单元测试

连续页码5: 8   [6,7,8,9,10] 
连续页码7: 8   [5,6,7,8,9,10,11]

连续页码5:  8   [6,7,8,9,10]
连续页码7:  8   [5,6,7,8,9,10,11]





面试问题：v-for与v-if优先级? 
v-for 优先级高于 v-if，v-for 循环渲染的元素，v-if 条件判断的元素。

工作当中是否自己封装过一些通用的组件？
分页器
1)需要知道数据总条数
2)每一个需要展示数据条数
3)知道当前是第几页
4)连续页码数字
5)自定义事件【子给父通信的】


5)push与replace区别?
编程式导航：push 与 replace
能不能记录历史记录：push（能记住历史记录）  replace（不能记住历史记录）
目前项目当中：进行路由跳转（编程式导航）基础都是push
push与replace是有区别的





6)开发详情业务
6.1:熟悉静态页面、书写样式
6.2：拆分组件
6.3:获取服务器动态展示
6.4：完成动态业务



7)滚动行为的设置。
如何点击产品后滚轮在顶部？
解决方案：
使用vuex的  ，在router里面设置    
//滚动行为，y=0表示滚动到顶部
    scrollBehavior (to, from, savedPosition) {
        return {  y: 0 }
}        




8)项目当中控制台

vue-warn:警告（不影响的你程序），对于你的代码提出一个警告。
对于程序没有任何影响，俗称假报错。


