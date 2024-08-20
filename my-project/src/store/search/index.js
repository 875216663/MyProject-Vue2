import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: {},
};

const actions = {
//当前这个reqGetSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
//params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
  //获取search模块数据
  async getSearchList({ commit }, params) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};

const mutations = {
  //第一个参数是该组件的state，第二个参数外部传递过来的数据,这个searchList是等价于result.data
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};

//计算属性
// getters主要的作用是:简化仓库中的数据(简化数据而生)
// 可以把将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters = {
  //当前形参state，当前仓库中的state，并非大仓库中的那个state
  goodsList(state) {
    //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
    //假如网络不给力|没有网state.searchList.goodsList会返回的是undefined
    //计算新的属性的属性值至少给人家来一个数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
