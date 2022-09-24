<template>
  <div class="row">
    <div class="col">
      <div class="card shadow-sm">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover table-bordered m-0 align-middle">
              <thead :class="{ 'table-active': false }">
                <tr>
                  <th class="text-center" style="width: 50px">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      @click="checkAll()"
                      v-model="isCheckAll"
                    />
                  </th>
                  <!-- <th scope="col">Image</th> -->
                  <th scope="col">Title</th>
                  <th scope="col" style="min-width: 100px">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in this.$store.getters.getProducts"
                  :key="item.id"
                  :ref="item.id"
                  @click="selectedRow(item)"
                >
                  <td class="text-center">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="item.id"
                      v-model="checkProducts"
                      @click="select()"
                    />
                  </td>
                  <td>{{ item.title }}</td>
                  <td>฿{{ item.price.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4" v-if="showForm">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-dark mb-3"
              @click="showForm = false"
            >
              Close
            </button>
          </div>
          <img :src="productForm.imageUrl" class="mb-3" />
          <p>{{ productForm.title }}</p>
          <p>฿{{ productForm.price.toLocaleString() }}</p>
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
      productForm: {
        title: '',
        price: '',
        imageUrl: '',
      },
      showForm: false,
      isActive: false,
      isSelect: false,
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
    selectedRow(product) {
      this.showForm = true
      this.productForm.title = product.title
      this.productForm.price = product.price
      this.productForm.imageUrl = product.imageUrl

      for (const [key, value] of Object.entries(this.$refs)) {
        value[0].classList.value = ''
      }
      this.$refs[product.id][0].classList.value = 'table-active'
    },
  },
}
</script>

<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 100%;
  object-fit: cover;
}
</style>