import Vue from "vue";
import Vuex from "vuex";
import orders from "./orders";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    orders,
  },
});

export interface RootState {}

export default store;
