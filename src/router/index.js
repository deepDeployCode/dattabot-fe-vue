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
      path: '/profile/str',
      name: '/str',
      component: () => import('@/views/Str.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'STR',
      },
    },
    {
      path: '/profile/pendidikan',
      name: '/pendidikan',
      component: () => import('@/views/Pendidikan.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Pendidikan',
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
      path: '/berkas',
      name: 'berkas',
      component: () => import('@/views/Berkas.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Berkas',
      },
    },
    {
      path: '/pdfview',
      name: 'pdfview',
      component: () => import('@/views/ViewPdf.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'PDF View',
      },
    },
    {
      path: '/krip',
      name: 'krip',
      component: () => import('@/views/KRIP.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'KRIP',
      },
    },
    {
      path: '/krip/jadwal',
      name: 'jadwal-krip',
      component: () => import('@/views/JadwalKRIP.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Jadwal KRIP',
      },
    },
    {
      path: '/mutasi',
      name: 'mutasi',
      component: () => import('@/views/Mutasi.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Mutasi',
      },
    },
    {
      path: '/mutasi/pengajuan-mutasi-masuk',
      name: 'pengajuan-mutasi-masuk',
      component: () => import('@/views/PengajuanMutasiMasuk.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Pengajuan Mutasi Masuk',
      },
    },
    {
      path: '/mutasi/pengajuan-mutasi-keluar',
      name: 'pengajuan-mutasi-keluar',
      component: () => import('@/views/PengajuanMutasiKeluar.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Pengajuan Mutasi Keluar',
      },
    },
    {
      path: '/mutasi/edit-pengajuan-mutasi-masuk',
      name: 'edit-pengajuan-mutasi-masuk',
      component: () => import('@/views/EditPengajuanMutasiMasuk.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Edit Mutasi Masuk',
      },
    },
    {
      path: '/mutasi/edit-pengajuan-mutasi-keluar',
      name: 'edit-pengajuan-mutasi-keluar',
      component: () => import('@/views/EditPengajuanMutasiKeluar.vue'),
      meta: {
        layout: 'full',
        navbar: true,
        title: 'Edit Mutasi Keluar',
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
