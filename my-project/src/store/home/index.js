import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";

//home模块的小仓库
const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};

const actions = {
  //不使用 async 和 await： result 是一个未解析的 promise 对象。
  // 使用 async 和 await： result 是 promise 解析后的实际数据。
  //commit 是一个函数，可以触发 mutations 中的函数。这里是context对象中的一个属性。结构赋值的方式，直接将context对象中的commit属性解构出来。
  //第二个参数是外部传递过来的参数，这个参数是一个对象，至少是一个空对象
 //获取三级分类列表数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code === 200) {
      commit("CATEGORYLIST", result.data);
    } else {
      console.log("获取三级分类列表数据失败");
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    // console.log('在向服务器发送请求获取轮播图的数据');
    let result = await reqGetBannerList();
    console.log(result);
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
  },
  //获取floor数据
  async getFloorList({ commit }) {
    let result = await reqGetFloorList();
    if (result.code === 200) {
      commit("GETFLOORLIST", result.data);
    }
  },
};

const mutations = {
  //保存三级分类列表数据，这个categoryList是外部传递过来的数据里的data的属性，是一个数组
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

//计算属性
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
