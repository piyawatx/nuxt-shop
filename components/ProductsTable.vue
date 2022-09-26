<template>
  <div>
    <div class="card card-body shadow-sm p-0">
      <div class="table-responsive">
        <table
          class="
            table table-hover table-borderless table-striped
            m-0
            align-middle
          "
        >
          <thead>
            <tr>
              <th class="text-center" style="width: 50px">
                <input
                  class="form-check-input"
                  type="checkbox"
                  @click="checkAll()"
                  v-model="isCheckAll"
                />
              </th>
              <th scope="col" style="min-width: 300px">Title</th>
              <th scope="col" style="width: 200px;min-width: 100px">Price</th>
              <th scope="col" style="width: 130px;min-width: 120px;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.$store.getters.getProducts" :key="item.id">
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="item.id"
                  v-model="checkProducts"
                  @click="select"
                />
              </td>
              <td>
                <img :src="item.imageUrl" alt="" class="me-2" />{{ item.title }}
              </td>
              <td>{{ item.price.toLocaleString() }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="edit(item)"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="deleteProduct(item.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">แก้ไขสินค้า</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formProduct.title"
                />
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input
                  type="number"
                  class="form-control"
                  v-model.number="formProduct.price"
                />
              </div>
              <div class="mb-3">
                <img class="modal-image" :src="formProduct.imageUrl" alt="" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="save">
              Save
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.$store.dispatch('fetchProducts')
  },
  data() {
    return {
      isCheckAll: false,
      checkProducts: [],
      formProduct: {
        id: '',
        title: '',
        price: '',
        imageUrl: '',
      },
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
    async save() {
      let newProduct = {
        title: this.formProduct.title,
        price: this.formProduct.price,
        imageUrl: this.formProduct.imageUrl,
      }
      await axios
        .put(
          'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products/' +
            this.formProduct.id +
            '.json',
          newProduct
        )
        .then((res) => {
          this.$store.dispatch('fetchProducts')
        })
    },
    edit(product) {
      this.formProduct.id = product.id
      this.formProduct.title = product.title
      this.formProduct.price = product.price
      this.formProduct.imageUrl = product.imageUrl
    },
    async deleteProduct(id) {
      await axios
        .delete(
          'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products/' +
            id +
            '.json'
        )
        .then((res) => {
          this.$store.dispatch('fetchProducts')
        })
    },
  },
}
</script>

<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 30px;
  object-fit: cover;
}
.modal-image{
  aspect-ratio: 1 / 1;
  width: 250px;
  object-fit: cover;
}
</style>