import { createRouter, createWebHistory } from 'vue-router'
import admin from '../router/admin.js'
import login from '../router/admin.js'

// const routes = [admin,login]


const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...admin.admin, 
        ...login.login, 
      ]
})

export default router