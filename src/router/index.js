import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'


import HomeView from '../views/HomeView.vue'


import ProductView from '../views/ProductView.vue'
import CategoryView from '../views/CategoryView.vue'
import SearchView from '../views/SearchView.vue'
import CartView from '../views/CartView.vue'
import signUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'
import checkOut from '../views/CheckOut.vue'
import Success from '../views/Success.vue'

const routes = [
  {
    path: '/',
    name: 'homeview',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:category_slug/:product_slug',
    name: "productview",
    component: ProductView
  },
  {
    path: '/:category_slug',
    name: "categoryview",
    component: CategoryView,
  },
  {
    path: '/search',
    name: "searchView",
    component: SearchView,
  },
  {
    path: '/cart',
    name: 'cartView',
    component: CartView,
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: signUp,
  },
  {
    path: '/log-in',
    name: 'logIn',
    component: LogIn,
  },
  {
    path: '/my-account',
    name: 'myAccount',
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/cart/success',
    name: 'success',
    component: Success,
  },
  {
    path: '/cart/check-out',
    name: 'checkOut',
    component: checkOut,
    meta: {
      requireLogin: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: "LogIn", query: { to: to.path }});
  } else {
    next()
  }
})

export default router
