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
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  data() {
    return {
      product: {
        title: "",
        price: "",
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
          this.$router.push('/')
        })
    },
    resetForm() {
      this.product.title = null
      this.product.price = null
      this.product.imageUrl = null
    },
    onFileSelected(event) {
      if (event.target.files[0]) {
        let file = event.target.files[0]
        this.product.imageUrl = URL.createObjectURL(file) // preview image

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

        const imageRef = ref(storage, 'img' + file.lastModified)
        uploadBytes(imageRef, file).then((res) => {
          let imageName = res.metadata.name
          getDownloadURL(ref(storage, imageName)).then((url) => {
            this.product.imageUrl = url
          })
        })
      } else {
        this.product.imageUrl = null
      }
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