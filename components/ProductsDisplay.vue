<template>
  <div class="row row-cols-2 row-cols-md-4 row-cols-lg-5  g-2">
    <div
      class="col"
      v-for="item in this.$store.getters.getProducts"
      :key="item.id"
    >
      <ProductCard
        :id="item.id"
        :title="item.title"
        :price="item.price"
        :imageUrl="item.imageUrl"
      />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  created() {
    this.$store.dispatch('fetchProducts')
  },
  methods: {},
}
</script>