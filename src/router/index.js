import Vue from 'vue'
import VueRouter from 'vue-router'
import { getUserDataFromStorage } from '@/helpers/getDataFromStorage'

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
        isBack: false,
        title: 'Simfoni',
      },
    },
    {
      path: '/studi-kasus',
      name: 'studi-kasus',
      component: () => import('@/views/StudiKasus.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        isBack: false,
        title: 'Forum',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        isBack: false,
        title: 'Profil',
      },
    },
    {
      path: '/profile/kompetensi',
      name: '/profile',
      component: () => import('@/views/Kompetensi.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Kompetensi',
      },
    },
    {
      path: '/studi-kasus/:id',
      name: 'detail-studi-kasus',
      component: () => import('@/views/DetailStudiKasus.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Detail Forum',
      },
    },
    {
      path: '/tambah/studi-kasus',
      name: 'tambah-studi-kasus',
      component: () => import('@/views/TambahStudiKasus.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Tambah Forum',
      },
    },
    {
      path: '/forum/edit/:id',
      name: 'edit-forum',
      component: () => import('@/views/EditForum.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Edit Forum',
      },
    },
    {
      path: '/forum/report/:id',
      name: 'report-forum',
      component: () => import('@/views/ReportForum.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Laporkan Forum',
      },
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/Menu.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Menu',
        isNavMenu: false,
      },
    },
    {
      path: '/tentang/susunan-pengurus',
      name: 'susunan-pengurus',
      component: () => import('@/views/SusunanPengurus.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Susunan Pengurus',
      },
    },
    {
      path: '/tentang/galery',
      name: 'galery',
      component: () => import('@/views/Galery.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Galeri',
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
        authenticationPage: true,
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
        isNavMenu: false,
        authenticationPage: true,
      },
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import('@/views/ForgetPassword.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        isNavMenu: false,
        title: 'Lupa Password',
        authenticationPage: true,
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
        isNavMenu: false,
        authenticationPage: true,
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

router.beforeEach((to, from, next) => {
  if (!to.meta.authenticationPage && !getUserDataFromStorage()?.tokenCurrent) {
    return next('/login')
  }

  return next()
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
