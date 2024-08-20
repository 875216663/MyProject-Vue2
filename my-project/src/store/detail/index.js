import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api";
//封装生成一个随机的字符串
import { getUUID } from "@/utils/uuid_token";

const state = {
    //根据传回的数据决定数据结构
    goodInfo: {},
    //游客的临时身份
    uuid_token: getUUID(),
};


const actions = {
    //获取产品详情信息
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


const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};


//简化数据而生
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //再服务器没有数据的时候返回一个空对象，为了防止如果你试图访问一个未定义的对象属性，会返回 undefined。但如果你继续访问 undefined 上的子属性（例如 state.goodInfo.categoryView.name），就会抛出一个错误，通常是 TypeError: Cannot read property 'name' of undefined。为了防止这种情况发生，返回一个空对象 {} 可以确保在访问对象的属性时不会报错。
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