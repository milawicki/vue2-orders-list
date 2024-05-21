<template>
  <table class="orders-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Data zamówienia</th>
        <th>Imię i nazwisko</th>
        <th>Adres email</th>
        <th>Wartość</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!orders.length">
        <td colspan="7">Brak zamówień</td>
      </tr>
      <template v-else>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ formatToDateTime(order.createdAt) }}</td>
          <td>{{ order.client.firstname }} {{ order.client.lastname }}</td>
          <td>{{ order.client.email }}</td>
          <td class="text-right">{{ formatLocalCurrency(order.value, "PLN") }}</td>
          <td class="text-center">
            <Badge :text="getStatus(order.status)" />
          </td>
          <td class="text-center">
            <Button type="primary" @click="$emit('showDetails', order.id)">Szczegóły</Button>
            <Button type="danger" @click="$emit('cancelOrder', order.id)">Anuluj</Button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue, { type PropType } from "vue";

import { formatToDateTime } from "@/helpers/date";
import { formatLocalCurrency } from "@/helpers/number";
import { getStatus } from "@/helpers/order";

import type { Order } from "@/types/order";

import Badge from "@/components/ui/Badge.vue";
import Button from "@/components/ui/Button.vue";

export default Vue.extend({
  name: "OrdersList",
  components: { Badge, Button },

  props: {
    orders: {
      type: Array as PropType<Order[]>,
      required: true,
    },
  },

  methods: {
    formatToDateTime,
    formatLocalCurrency,
    getStatus,
  },
});
</script>

<style scoped>
.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.orders-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #4caf50;
  color: #fff;
}

.orders-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
