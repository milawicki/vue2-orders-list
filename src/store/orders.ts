import type { Module } from "vuex";

import { getOrders } from "@/services/orders";
import type { DeepPartial, Nullable, Order, OrderStatus, PaginatedItems, Pagination } from "@/types";
import type { RootState } from ".";

interface OrderState {
  loading: boolean;

  orders: Order[];
  pagination: Nullable<Pagination>;

  currentPage: number;
  currentFilters: DeepPartial<Order>;
}

const orders: Module<OrderState, RootState> = {
  namespaced: true,

  state: {
    loading: false,

    orders: [],
    pagination: null,

    currentPage: 1,
    currentFilters: {},
  },

  getters: {
    orders(state: OrderState): Order[] {
      return state.orders;
    },

    pagination(state: OrderState): Nullable<Pagination> {
      return state.pagination;
    },

    loading(state: OrderState): boolean {
      return state.loading;
    },
  },

  mutations: {
    setOrders(state: OrderState, orders: Order[]) {
      state.orders = orders;
    },

    setPagination(state: OrderState, pagination: Pagination) {
      state.pagination = pagination;
    },

    setLoading(state: OrderState, loading: boolean) {
      state.loading = loading;
    },

    updatePageNumber(state: OrderState, pageNumber: number) {
      state.currentPage = pageNumber;
    },

    updateFilters(state: OrderState, filters: DeepPartial<Order>) {
      state.currentFilters = filters;
    },
  },

  actions: {
    getOrders({ commit, state }) {
      commit("setLoading", true);

      try {
        const { items, ...pagination }: PaginatedItems<Order> = getOrders(state.currentPage, state.currentFilters);

        commit("setOrders", items);
        commit("setPagination", pagination);
      } catch (error) {
        console.error(error);
      } finally {
        commit("setLoading", false);
      }
    },

    updatePageNumber({ commit, dispatch }, pageNumber: number) {
      commit("updatePageNumber", pageNumber);

      dispatch("getOrders");
    },

    updateFilters(
      { commit, dispatch },
      filters: { id: string; date: string; lastname: string; email: string; status: string }
    ) {
      const { id, date, lastname, email, status } = filters;

      const currentFilters = {
        id,
        createdAt: date,
        status: status as OrderStatus,
        client: {
          lastname,
          email,
        },
      };

      commit("updateFilters", currentFilters);
      commit("updatePageNumber", 1);

      dispatch("getOrders");
    },
  },
};

export default orders;
