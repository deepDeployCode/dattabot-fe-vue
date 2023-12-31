import Vue from "vue";
import VueRouter from "vue-router";
import { getUserDataFromStorage } from "@/helpers/getDataFromStorage";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      name: "beranda",
      component: () => import("@/views/Beranda.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "Simfoni",
      },
    },
    {
      path: "/webinar",
      name: "webinar",
      component: () => import("@/views/Webinar.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "Webinar",
      },
    },
    {
      path: "/webinar/:id_webinar/detail",
      name: "webinar_detail",
      component: () => import("@/views/WebinarDetails.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "webinar detail",
      },
    },
    {
      path: "/notifikasi",
      name: "notifikasi",
      component: () => import("@/views/Notification.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "notifikasi",
      },
    },
    {
      path: "/notifikasi/:id_notification",
      name: "detail_notifikasi",
      component: () => import("@/views/detailNotification.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "detail notifikasi",
      },
    },

    {
      path: "/sertifikat/:id_sertifikat/webinar",
      name: "sertifikat_webinar",
      component: () => import("@/views/SertifikatWebinar.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "Sertifikat Webinar",
      },
    },
    {
      path: "/studi-kasus",
      name: "studi-kasus",
      component: () => import("@/views/StudiKasus.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "Forum",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/Profile.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isBack: false,
        title: "Profil",
      },
    },
    {
      path: "/profile/kompetensi",
      name: "/profile",
      component: () => import("@/views/Kompetensi.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Kompetensi",
      },
    },
    {
      path: "/profile/str",
      name: "/str",
      component: () => import("@/views/Str.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "STR",
      },
    },
    {
      path: "/profile/pendidikan",
      name: "/pendidikan",
      component: () => import("@/views/Pendidikan.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Pendidikan",
      },
    },
    {
      path: "/studi-kasus/:id",
      name: "detail-studi-kasus",
      component: () => import("@/views/DetailStudiKasus.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Detail Forum",
      },
    },
    {
      path: "/tambah/studi-kasus",
      name: "tambah-studi-kasus",
      component: () => import("@/views/TambahStudiKasus.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Tambah Forum",
      },
    },
    {
      path: "/forum/edit/:id",
      name: "edit-forum",
      component: () => import("@/views/EditForum.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Edit Forum",
      },
    },
    {
      path: "/forum/report/:id",
      name: "report-forum",
      component: () => import("@/views/ReportForum.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Laporkan Forum",
      },
    },
    {
      path: "/menu",
      name: "menu",
      component: () => import("@/views/Menu.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Menu",
        isNavMenu: false,
      },
    },
    {
      path: "/tentang/susunan-pengurus",
      name: "susunan-pengurus",
      component: () => import("@/views/SusunanPengurus.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Susunan Pengurus",
      },
    },
    {
      path: "/tentang/galery",
      name: "galery",
      component: () => import("@/views/Galery.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Galeri",
      },
    },
    {
      path: "/berkas",
      name: "berkas",
      component: () => import("@/views/Berkas.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Berkas",
      },
    },
    {
      path: "/pdfview",
      name: "pdfview",
      component: () => import("@/views/ViewPdf.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "PDF View",
      },
    },
    {
      path: "/pokemon",
      name: "pokemon",
      component: () => import("@/views/Pokemon.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "POKEMON DATA",
      },
    },
    {
      path: "/krip/jadwal",
      name: "jadwal-krip",
      component: () => import("@/views/JadwalKRIP.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Jadwal KRIP",
      },
    },
    {
      path: "/webinar/jadwal",
      name: "jadwal-krip",
      component: () => import("@/views/JadwalWEBINAR.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Jadwal WEBINAR",
      },
    },
    {
      path: "/mutasi",
      name: "mutasi",
      component: () => import("@/views/Mutasi.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Mutasi",
      },
    },
    {
      path: "/mutasi/pengajuan-mutasi-masuk",
      name: "pengajuan-mutasi-masuk",
      component: () => import("@/views/PengajuanMutasiMasuk.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Pengajuan Mutasi Masuk",
      },
    },
    {
      path: "/mutasi/pengajuan-mutasi-keluar",
      name: "pengajuan-mutasi-keluar",
      component: () => import("@/views/PengajuanMutasiKeluar.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Pengajuan Mutasi Keluar",
      },
    },
    {
      path: "/mutasi/edit-pengajuan-mutasi-masuk",
      name: "edit-pengajuan-mutasi-masuk",
      component: () => import("@/views/EditPengajuanMutasiMasuk.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Edit Mutasi Masuk",
      },
    },
    {
      path: "/mutasi/edit-pengajuan-mutasi-keluar",
      name: "edit-pengajuan-mutasi-keluar",
      component: () => import("@/views/EditPengajuanMutasiKeluar.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Edit Mutasi Keluar",
      },
    },
    {
      path: "/rekomendasi/umum",
      name: "rekomendasi-umum",
      component: () => import("@/views/RekomendasiUmum.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Rekomendasi SIP Umum",
      },
    },
    {
      path: "/rekomendasi/spesialis",
      name: "rekomendasi-spesialis",
      component: () => import("@/views/RekomendasiSpesialis.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Rekomendasi SIP Spesialis",
      },
    },
    {
      path: "/rekomendasi/umum/create",
      name: "create-rekomendasi-umum",
      component: () => import("@/views/CreateRekomendasiUmum.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Rekomendasi SIP Umum",
      },
    },
    {
      path: "/rekomendasi/umum/:id/edit",
      name: "edit-rekomendasi-umum",
      component: () => import("@/views/EditRekomendasiUmum.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Edit Rekomendasi SIP Umum",
      },
    },
    {
      path: "/rekomendasi/spesialis/create",
      name: "create-rekomendasi-spesialis",
      component: () => import("@/views/CreateRekomendasiSpesialis.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Rekomendasi SIP Spesialis",
      },
    },
    {
      path: "/rekomendasi/spesialis/:id/edit",
      name: "edit-rekomendasi-spesialis",
      component: () => import("@/views/EditRekomendasiSpesialis.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Edit Rekomendasi SIP Spesialis",
      },
    },
    {
      path: "/rekomendasi/:id/pembayaran",
      name: "pembayaran-rekomendasi-umum",
      component: () => import("@/views/InvoicesRekomendasi.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Pembayaran",
      },
    },
    {
      path: "/second-page",
      name: "second-page",
      component: () => import("@/views/SecondPage.vue"),
      meta: {
        pageTitle: "Second Page",
        breadcrumb: [
          {
            text: "Second Page",
            active: true,
          },
        ],
      },
    },
    {
      path: "/login-legacy",
      name: "loginLegacy",
      component: () => import("@/views/LoginLegacy.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        layout: "full",
        authenticationPage: true,
      },
    },

    /**
     * route new authentication
     */
    // {
    //   path: "/register",
    //   name: "register",
    //   component: () => import("@/views/Register.vue"),
    //   meta: {
    //     layout: "full",
    //     navbar: true,
    //     title: "Daftar Akun",
    //     isNavMenu: false,
    //     authenticationPage: true,
    //   },
    // },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterUser.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Daftar Akun",
        isNavMenu: false,
        authenticationPage: true,
      },
    },

    {
      path: "/register/success",
      name: "register-success",
      component: () => import("@/views/RegisterSuccess.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Daftar Akun",
        isNavMenu: false,
        authenticationPage: true,
      },
    },

    /**
     * route new authentication
     */

    //check verify email before lengkapi data calon anggota

    /** hide route reg account dan complete registration */
    // {
    //   path: "/auth/verify/:reg_token",
    //   name: "verify_email_account",
    //   component: () => import("@/views/verifyAccount.vue"),
    //   meta: {
    //     layout: "full",
    //     navbar: true,
    //     title: "verify email account",
    //     isNavMenu: false,
    //     authenticationPage: true,
    //   },
    // },
    // {
    //   path: "/reg/:reg_token/data",
    //   name: "complete_registration",
    //   component: () => import("@/views/CompleteRegistration.vue"),
    //   meta: {
    //     layout: "full",
    //     navbar: true,
    //     title: "Complete Registration",
    //     isNavMenu: false,
    //     authenticationPage: true,
    //   },
    // },
    /** hide route reg account dan complete registration */
    //bayar tagihan
    {
      path: "/bayar/:id_invoices/invoice",
      name: "bayar-tagihan-calona-anggota",
      component: () => import("@/views/BayarTagihan.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "bayar tagihan",
        isNavMenu: false,
        authenticationPage: true,
      },
    },
    //end check verify email before lengkapi data calon anggota
    {
      path: "/forget-password",
      name: "forget-password",
      component: () => import("@/views/ForgetPassword.vue"),
      meta: {
        layout: "full",
        navbar: true,
        isNavMenu: false,
        title: "Lupa Password",
        authenticationPage: true,
      },
    },
    {
      path: "/auth/changePassword/:token",
      name: "change-password",
      component: () => import("@/views/ChangePassword.vue"),
      meta: {
        layout: "full",
        navbar: true,
        title: "Reset Password",
        isNavMenu: false,
        authenticationPage: true,
      },
    },
    {
      path: "/error-404",
      name: "error-404",
      component: () => import("@/views/error/Error404.vue"),
      meta: {
        layout: "full",
      },
    },
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.authenticationPage && !getUserDataFromStorage()?.tokenCurrent) {
    return next("/login");
  }

  return next();
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
