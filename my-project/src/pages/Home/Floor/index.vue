<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{list.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li v-for="(nav, index) in list.navList" :key="index">
              <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img src="./images/floor-1-1.png" />
            </div>
            <div class="floorBanner">

              <!-- //轮播图 -->
              <Carsousel :list="list.carouselList" />
              <!-- <div class="swiper-container" id="floor2Swiper">
                
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="carousel in list.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div>
                 如果需要分页器 
                <div class="swiper-pagination"></div>

                如果需要导航按钮 
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->

            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Floor",
  //接受父组件传递的数据
  props:['list'],
  // mounted() {
  //   //第一次书写swiper的时候：在mounted当中书写是不可以的，但是为什么现在这里可以呢？
  //   //第一次书写轮播图的时候，是在当前组件内部发请求、动态渲染解构【前台至少服务器数据需要回来】，因此当年的写法在这里不行
  //   //现在的这种写法为什么可以：因为请求是父组件发的，父组件通过props传递过来的，而且结构都已经有了的情况下执行mounted
  //   var mySwiper = new Swiper(document.querySelectorAll(".swiper-container"), {
  //     loop: true, // 循环模式选项
  //     // 如果需要分页器
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true, //点击小球的时候也切换图片
  //     },
  //     // 如果需要前进后退按钮
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //   });
  // },
  // watch:{
  //   list:{
  //     //立即观察，不管数据有没有发生变化，上来就执行handler
  //     //为什么watch监听不到list的变化呢？因为这个数据是父组件传递过来的，父组件传递过来的数据，该有的都有，子组件是监听不到的
  //     immediate:true,
  //     handler(newvalue, oldvalue) {
  //       //使用this.$nextTick()，确保dom已经渲染完成，再执行new Swiper
  //       this.$nextTick(() => {
  //         var mySwiper = new Swiper(document.querySelectorAll(".swiper-container"), {
  //             loop: true, // 循环模式选项
  //             // 如果需要分页器
  //             pagination: {
  //               el: ".swiper-pagination",
  //               clickable: true, //点击小球的时候也切换图片
  //             },
  //             // 如果需要前进后退按钮
  //             navigation: {
  //               nextEl: ".swiper-button-next",
  //               prevEl: ".swiper-button-prev",
  //             },
  //           }
  //         );
  //       });
  //     },
  //   }
  // }
};
</script>







<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
