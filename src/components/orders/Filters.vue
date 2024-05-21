<template>
  <div class="ordersFilters">
    <h1>Filtruj zamówienia</h1>
    <form @submit.prevent="update">
      <div>
        <label>ID:</label>
        <input v-model="id" type="text" />
      </div>

      <div>
        <label>Data:</label>
        <input v-model="date" type="date" />
      </div>

      <div>
        <label>Nazwisko:</label>
        <input v-model="lastname" type="text" />
      </div>

      <div>
        <label>Email:</label>
        <input v-model="email" type="text" />
      </div>

      <div>
        <label>Status:</label>
        <select v-model="status">
          <option value="">Wszystkie</option>
          <option v-for="status in statuses" :key="status" :value="status">{{ getStatus(status) }}</option>
        </select>
      </div>

      <div>
        <Button type="primary" @click="update">Zastosuj</Button>
        <Button type="danger" @click="reset">Reset</Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { getStatus } from "@/helpers/order";

import Button from "@/components/ui/Button.vue";

import type { OrderStatus } from "@/types/order";

interface Data {
  id: string;
  date: string;
  lastname: string;
  email: string;
  status: string;
}

export default Vue.extend({
  name: "OrdersFilter",
  components: { Button },

  data(): Data {
    return {
      id: "",
      date: "",
      lastname: "",
      email: "",
      status: "",
    };
  },

  computed: {
    statuses(): OrderStatus[] {
      return ["active", "finished", "canceled"];
    },
  },

  methods: {
    getStatus,

    update() {
      const filters = {
        id: this.id || undefined,
        date: this.date || undefined,
        lastname: this.lastname || undefined,
        email: this.email || undefined,
        status: this.status || undefined,
      };

      this.$emit("update", filters);
    },

    reset() {
      this.id = "";
      this.date = "";
      this.lastname = "";
      this.email = "";
      this.status = "";

      this.update();
    },
  },
});
</script>

<style scoped>
.ordersFilters form {
  display: flex;
  flex-direction: row;
  border: none;
  align-items: center;
  justify-content: space-between;
}

.ordersFilters label {
  margin-right: 10px;
}
</style>
