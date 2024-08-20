<template>
  <div>
    <!-- 使用三级联动，已经注册，不需要import -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
//引入其余组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Brand from "@/pages/Home/Brand";
import Floor from "@/pages/Home/Floor";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    //派发action，获取floor数据
    this.$store.dispatch("getFloorList");
    
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor,
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>