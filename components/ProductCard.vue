<template>
  <div @click="onclick">
    <div class="card shadow-sm">
      <img :src="imageUrl" class="card-img-top" />
      <div class="card-body p-2">
        <p class="card-text m-0">
          {{ title.substring(0,25)}}
        </p>
        <p class="fs-5 m-0">฿ {{ price.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: String,
    title: String,
    price: Number,
    imageUrl: String,
  },
  created() {},
  methods: {
    onclick() {
      console.log(this.id)
      this.$router.push('product/' + this.id)
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