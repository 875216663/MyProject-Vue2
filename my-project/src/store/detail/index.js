import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api";
//封装临时身份的模块。生成一个随机的字符串，不能再变了
import { getUUID } from "@/utils/uuid_token";

const state = {
    //根据传回的数据决定数据结构
    goodInfo: {},
    //游客的临时身份呢
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO", result.data);
        }
    },
    //将产品添购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
};
//简化数据而生
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //再服务器没有数据的时候返回一个空对象
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    },
};

export default{
    state,
    mutations,
    actions,
    getters
}