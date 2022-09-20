<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="saveData">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="product.title"
          />
        </div>
        <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            v-model.number="product.price"
          />
        </div>
        <div class="mb-3">
          <label for="imageUrl" class="form-label">Image URL</label>
          <!-- <input
            type="text"
            class="form-control"
            id="imageUrl"
            v-model="product.imageUrl"
          /> -->
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onFileSelected"
            ref="myFileInput"
          />
        </div>
        <div class="mb-3">
          <img :src="product.imageUrl" v-if="product.imageUrl" />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      product: {
        title: null,
        price: null,
        imageUrl: null,
      },
    }
  },
  methods: {
    saveData() {
      axios
        .post(
          'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
          this.product
        )
        .then((res) => {
          console.log(res)
          this.resetForm()
        })
    },
    resetForm() {
      this.product.title = null
      this.product.price = null
      this.product.imageUrl = null
    },
    onFileSelected(event) {
      if (event.target.files[0]) {
        this.selectedFile = event.target.files[0]
        this.product.imageUrl = URL.createObjectURL(this.selectedFile) // preview image
      } else {
        this.product.imageUrl = null
      }
    },
  },
}
</script>