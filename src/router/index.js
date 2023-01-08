import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'beranda',
      component: () => import('@/views/Beranda.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Simfoni',
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login-legacy',
      name: 'loginLegacy',
      component: () => import('@/views/LoginLegacy.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Daftar Akun',
      },
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('@/views/ForgetPassword.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Lupa Password',
      },
    },
    {
      path: '/auth/changePassword/:token',
      name: 'change-password',
      component: () => import('@/views/ChangePassword.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Reset Password',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
