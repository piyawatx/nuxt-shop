<template>
  <div class="container">
    <div class="card mt-3 shadow-sm">
      <div class="card-body">
        <div class="row">
          <div class="col-4"><img :src="product.imageUrl" alt="" /></div>
          <div class="col-8">
            <p class="fs-4 m-0">{{ product.title }}</p>
            <p class="fs-2 m-0">฿ {{ product.price.toLocaleString() }}</p>
            <button type="button" class="btn btn-danger">ซื้อสินค้า</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      product: {
        id: null,
        title: null,
        price: '',
        imageUrl: null,
      },
    }
  },
  created() {
    this.getProductById(this.$route.params.id)
  },
  methods: {
    async getProductById(id) {
      await axios
        .get(
          'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products/' +
            id +
            '.json'
        )
        .then((res) => {
          console.log(res.data)
          this.product = res.data
        })
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