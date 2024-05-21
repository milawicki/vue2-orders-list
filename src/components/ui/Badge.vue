<template>
  <span class="badge">
    {{ text }}
  </span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Badge",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.badge {
  border-radius: 5px;
  padding: 5px 10px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  display: inline-block;
  background-color: #4caf50;
}
</style>
