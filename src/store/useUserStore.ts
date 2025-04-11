// src/stores/user.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: ''
  }),
  actions: {
    setUser(userData) {
      this.username = userData.username
      this.email = userData.email
    }
  },
  getters: {
    getUserInfo: (state) => {
      return `User: ${state.username}, Email: ${state.email}`
    }
  }
})
