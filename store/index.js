import axios from 'axios'
export const state = () => ({
  products: [],
})

export const getters = {
  getProducts(state) {
    return state.products
  },
}

export const mutations = {
  setProducts(state, data) {
    state.products = data
  },
}

export const actions = {
  fetchProducts(context) {
    
    
    axios
      .get(
        'https://nuxt-demo-6feb2-default-rtdb.asia-southeast1.firebasedatabase.app/products.json'
      )
      .then((res) => {
        let data = []
        for (let key in res.data) {
          data.push({ ...res.data[key], id: key })
        }
        context.commit('setProducts', data)
      })
  },
}
