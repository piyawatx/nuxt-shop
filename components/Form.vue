<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <form @submit.prevent="saveData">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model.trim="product.title"
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
          <label for="imageUrl" class="form-label">Image</label>
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="onFileSelected"
            ref="myFileInput"
            accept="image/*"
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
import Swal from 'sweetalert2'

import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyBHAu-Tdww-tuQ4wwkxOvyJ_O-mNqlBgQc',
  authDomain: 'nuxt-demo-6feb2.firebaseapp.com',
  databaseURL:
    'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'nuxt-demo-6feb2',
  storageBucket: 'nuxt-demo-6feb2.appspot.com',
  messagingSenderId: '493057169770',
  appId: '1:493057169770:web:53f650d42fc5241a7ded13',
}
const app = initializeApp(firebaseConfig, 'nuxt-shop')
const storage = getStorage(app)

export default {
  data() {
    return {
      product: {
        title: '',
        price: '',
        imageUrl: null,
      },
      file: null,
      newImageName: null,
    }
  },
  methods: {
    async saveData() {
      if (this.validate()) {
        await this.uploadImage()
        await this.getImageUrl()
        await this.createProduct()
        this.resetForm()
        this.$router.push('/admin/products')
      } else {
        alert('ข้อมูลไม่ครบ')
      }
    },
    resetForm() {
      this.product.title = null
      this.product.price = null
      this.product.imageUrl = null
    },
    validate() {
      if (!this.product.title) {
        return false
      } else if (!this.product.price) {
        return false
      } else if (!this.product.imageUrl) {
        return false
      } else {
        return true
      }
    },
    onFileSelected(event) {
      if (event.target.files[0]) {
        this.file = event.target.files[0]
        this.product.imageUrl = URL.createObjectURL(this.file) // preview image
      } else {
        this.product.imageUrl = null
      }
    },
    async uploadImage() {
      const imageRef = ref(storage, 'img' + this.file.lastModified)
      await uploadBytes(imageRef, this.file).then((res) => {
        this.newImageName = res.metadata.name
      })
    },
    async getImageUrl() {
      // console.log("newImage name ",this.newImageName);
      await getDownloadURL(ref(storage, this.newImageName)).then((url) => {
        this.product.imageUrl = url
        // console.log(url)
      })
    },
    async createProduct() {
      await axios
        .post(
          'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products.json',
          this.product
        )
        .then((res) => {
          console.log(res)
          Swal.fire({
            icon: 'success',
            title: 'Saved',
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
  },
}
</script>
<style scoped>
img {
  aspect-ratio: 1 / 1;
  width: 250px;
  object-fit: cover;
}
</style>