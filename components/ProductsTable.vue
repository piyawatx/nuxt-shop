<template>
  <div>
    <div class="card shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover table-borderless table-striped m-0 align-middle">
            <thead>
              <tr>
                <th class="text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    @click="checkAll()"
                    v-model="isCheckAll"
                  />
                </th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in this.$store.getters.getProducts"
                :key="item.id"
              >
                <td class="text-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="item.id"
                    v-model="checkProducts"
                    @click="select"
                  />
                </td>

                <td><img :src="item.imageUrl" alt="" /></td>
                <td>{{ item.title }}</td>
                <td>{{ item.price.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchProducts')
  },
  data() {
    return {
      isCheckAll: false,
      checkProducts: [],
    }
  },
  methods: {
    checkAll() {
      this.isCheckAll = !this.isCheckAll
      this.checkProducts = []
      let products = this.$store.getters.getProducts
      if (this.isCheckAll) {
        products.forEach((product) => {
          this.checkProducts.push(product.id)
        })
      }
    },
    select() {
      this.isCheckAll = false
    },
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