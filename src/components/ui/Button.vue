<template>
  <button :class="['btn', type]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Button",
  props: {
    type: {
      type: String,
      default: "primary",
      validator: function (value: string) {
        return ["primary", "danger"].indexOf(value) !== -1;
      },
    },
  },
});
</script>

<style scoped>
.btn {
  border: none;
  color: white;
  padding: 7px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.btn.primary {
  background-color: #4caf50;
}

.btn.danger {
  background-color: #f44336;
}
</style>
