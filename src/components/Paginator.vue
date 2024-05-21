<template>
  <div class="pagination">
    <span v-for="page in pages" :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">{{
      page
    }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface Data {
  page: number;
}

export default Vue.extend({
  name: "Paginator",

  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: false,
    },
  },

  data(): Data {
    return {
      page: this.currentPage || 1,
    };
  },

  computed: {
    pages(): number {
      if (this.itemsPerPage <= 0) {
        return 0;
      }

      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },

  methods: {
    changePage(page: number) {
      this.page = page;

      this.$emit("pageChanged", this.page);
    },
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.pagination span {
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: #f0f0f0;
}
.pagination span.active {
  background: #4caf50;
  color: #fff;
}
</style>
