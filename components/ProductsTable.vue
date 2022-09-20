<template>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Image</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in this.$store.getters.getProducts"
        :key="item.id"
      >
        <th class="text-center">{{ index + 1 }}</th>
        <td>{{ item.title }}</td>
        <td class="text-end">{{ item.price.toLocaleString() }}</td>
        <td><img :src="item.imageUrl" alt="" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchProducts')
  },
}
</script>

<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 50px;
  object-fit: cover;
}
</style>