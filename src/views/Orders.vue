<template>
  <Loader v-if="loading" />
  <div v-else>
    <OrderFilters @update="updateFilters" />

    <OrdersList :orders="orders" />

    <Paginator
      v-if="pagination"
      :totalItems="pagination.totalItems"
      :itemsPerPage="pagination.itemsPerPage"
      :currentPage="pagination.currentPage"
      @pageChanged="updatePageNumber"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

import Loader from "@/components/ui/Loader.vue";
import OrderFilters from "@/components/orders/Filters.vue";
import OrdersList from "@/components/orders/List.vue";
import Paginator from "@/components/Paginator.vue";

export default Vue.extend({
  name: "OrdersPage",
  components: { Loader, OrderFilters, OrdersList, Paginator },

  computed: mapGetters({
    loading: "orders/loading",

    orders: "orders/orders",
    pagination: "orders/pagination",
  }),

  mounted() {
    this.getOrders();
  },

  methods: mapActions({
    getOrders: "orders/getOrders",
    updatePageNumber: "orders/updatePageNumber",
    updateFilters: "orders/updateFilters",
  }),
});
</script>

<style scoped></style>
