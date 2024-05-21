<template>
  <Orders />
</template>

<script lang="ts">
import "@/styles/global.css";

import Vue from "vue";

import Orders from "@/views/Orders.vue";

export default Vue.extend({
  components: { Orders },
});
</script>
