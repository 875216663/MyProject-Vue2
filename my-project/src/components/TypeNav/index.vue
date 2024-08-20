<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件处理 -->
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-catagory1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二级分类 -->
                <!-- 使用js来实现隐藏与显示 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-catagory2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- 会卡顿因为太多组件一起加载 -->
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-catagory3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash ,用于节流,并且按需引入，减少打包体积
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },

  computed: {
    //右侧需要的是一个函数，当使用计算属性的时候，会自动调用这个函数。注入的state是大仓库的state
    //下面作用是将Vuex中的分类数据映射到当前组件的计算属性中
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },

  methods: {
    //鼠标移入,并且使用节流，防止频繁触发
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    //鼠标移出
    leaveIndex() {
      this.currentIndex = -1;
      //只有在search页面，才会隐藏
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    //点击跳转到搜索页面
    //若身上有categoryName属性，说明是a标签，点击的是分类
    //时间委派+编程式导航
    goSearch(event) {
      let element = event.target;
      //获取当前点击的元素,使用dataset获取自定义属性,使用小写
      let { categoryname, catagory1id, catagory2id, catagory3id } =
        element.dataset;
      if (categoryname) {
        let loaction = { name: "search" };
        let query = { categoryName: categoryname };
        if (catagory1id) {
          query.catagory1Id = catagory1id;
        } else if (catagory2id) {
          query.catagory2Id = catagory2id;
        } else if (catagory3id) {
          query.catagory3Id = catagory3id;
        }
        //如果路由有跳转有参数，就传递参数parms
        if (this.$route.params) {
          loaction.params = this.$route.params;
          loaction.query = query;
          //路由跳转
          this.$router.push(loaction);
        }
      }
    },
  },

  mounted() {
    //如果是首页，就展示，如果是search页面，就不展示
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        // 这个是整个分类的样式
        // .item:hover {
        //   background: #4d94e7;
        // }
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //   &:hover {
          //     .item-list {
          //       display: block;
          //     }
          //   }
        }
        .cur {
          background-color: #64a5da;
        }
      }
    }
    // 过度动画进入前的时候
    .sort-enter {
      height: 0px;
    }
    //过度动画进入的时候
    .sort-enter-to {
      height: 461px;
    }
    //过渡动画进入时间速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>