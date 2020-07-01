import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: [],
    isLoading: false
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    LOCATIONS (state, payload) {
      state.location = payload
    }
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getWeather (context) {
      const api = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${process.env.VUE_APP_API_PATH}`
      context.commit('LOADING', true)
      axios.get(api).then((response) => {
        context.commit('LOCATIONS', response.data.records.location)
        context.commit('LOADING', false)
      })
    }
  }
})
