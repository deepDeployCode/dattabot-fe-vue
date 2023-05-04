import resource from "./resource";

function clean(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined) {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName];
    }
  }
  return obj;
}

const endpoints = {
  auth: {
    login: "/auth/login",
    forgotPassword: "/auth/forgotPassword",
    resetPassword: "/auth/changePassword/noAuth",
    getChangePassword: "/auth/changePassword",
    register: "/auth/register",
    user: "/auth/user",
    verify: "/auth/verify",
  },
  forum: {
    default: "/forum",
    comment: "/forum/comment",
    report: "/forum/report",
    like: "/forum/like",
  },
  tentang: {
    galeri: "/galeri?page=1&filter_rules=[]",
    berkas: "/document?page=1&filter_rules=[]",
  },
  krip: {
    default: "/krip",
    upload: "/krip/upload",
    schedule: "/krip/schedule",
    daftar: "/krip/register",
    cancel: "/krip/cancel",
  },
  mutasiMasuk: {
    pengajuan: "/entry-mutation",
    buatPengajuan: "/entry-mutation/create",
    updatePengajuan: "/entry-mutation/update",
  },
  mutasiKeluar: {
    pengajuan: "/out-mutation",
    buatPengajuan: "/out-mutation/create",
    updatePengajuan: "/out-mutation/update",
  },
  profile: {
    default: "/profile",
    str: "/profile/str",
    createStr: "/profile/str/create",
    pendidikan: "/profile/pendidikan",
    createPendidikan: "/profile/pendidikan/create",
    update: "update",
  },
  rekomendasi: {
    default: "/recommendation",
    cancel: "cancel",
    input: "input",
    publish: "publish",
  },
  completeRegistration: {
    default: "/reg",
    data: "data",
    lengkapi: "submitData",
    verifyStatusAccount: "verify",
    account: "accountStatus",
    InvoicesIuran: {
      bayar: "bayar",
      invoices: "invoices",
    },
  },
};

const apis = {
  auth: {
    login(data) {
      return resource.post(endpoints.auth.login, data);
    },
    getChangePassword(token) {
      return resource.get(`${endpoints.auth.getChangePassword}/${token}`);
    },
    forgotPassword(data) {
      return resource.post(endpoints.auth.forgotPassword, data);
    },
    resetPassword(data) {
      return resource.post(endpoints.auth.resetPassword, data);
    },
    register(data) {
      return resource.post(endpoints.auth.register, data);
    },
    getUser() {
      return resource.post(endpoints.auth.user);
    },
  },
  completeRegistration: {
    emailVerify(reg_token) {
      return resource.get(`${endpoints.auth.verify}/${reg_token}`);
    },

    getDataCalonAnggota(reg_token) {
      return resource.post(
        `${endpoints.completeRegistration.default}/${reg_token}/${endpoints.completeRegistration.data}`
      );
    },
    lengkapiDataCalonAngota(reg_token, body) {
      return resource.put(
        `${endpoints.completeRegistration.default}/${reg_token}/${endpoints.completeRegistration.lengkapi}`,
        body
      );
    },
    verifyAccountStatus(email) {
      return resource.post(
        `${endpoints.completeRegistration.default}/${endpoints.completeRegistration.verifyStatusAccount}/${email}/${endpoints.completeRegistration.account}`
      );
    },
    bayarInvoicesIuran(id_invoices) {
      return resource.get(
        `${endpoints.completeRegistration.default}/${endpoints.completeRegistration.InvoicesIuran.bayar}/${id_invoices}/${endpoints.completeRegistration.InvoicesIuran.invoices}`
      );
    },
    submitBayarInvoicesIuran(id_invoices, body) {
      return resource.post(
        `${endpoints.completeRegistration.default}/${endpoints.completeRegistration.InvoicesIuran.bayar}/${id_invoices}/${endpoints.completeRegistration.InvoicesIuran.invoices}`,
        body
      );
    },
  },
  forum: {
    getAll(url) {
      return resource.get(url || endpoints.forum.default);
    },
    getById(id) {
      return resource.get(`${endpoints.forum.default}/${id}`);
    },
    addForum(data) {
      return resource.post(endpoints.forum.default, data);
    },
    addComment(id, data) {
      return resource.post(`${endpoints.forum.comment}/${id}`, data);
    },
    editForum(data) {
      return resource.put(endpoints.forum.default, data);
    },
    reportForum(id, data) {
      return resource.post(`${endpoints.forum.report}/${id}`, data);
    },
    likeForum(id) {
      return resource.post(`${endpoints.forum.like}/${id}`);
    },
  },
  tentang: {
    getGalery() {
      return resource.get(endpoints.tentang.galeri);
    },
    getBerkas() {
      return resource.get(endpoints.tentang.berkas);
    },
  },
  krip: {
    getKrip(url = endpoints.krip.default) {
      return resource.get(url);
    },
    upload(data) {
      return resource.post(endpoints.krip.upload, data);
    },
    getSchedule(url = endpoints.krip.schedule) {
      return resource.get(url);
    },
    daftar(data) {
      return resource.post(endpoints.krip.daftar, data);
    },
    batal(id) {
      return resource.post(endpoints.krip.cancel, {
        kripjadwal_id: id,
      });
    },
    deleteBerkas(id) {
      return resource.delete(`/${endpoints.krip.default}/${id}`);
    },
  },
  mutasiMasuk: {
    getPengajuan() {
      return resource.get(endpoints.mutasiMasuk.pengajuan);
    },
    buatPengajuan(data) {
      return resource.post(endpoints.mutasiMasuk.buatPengajuan, data);
    },
    updatePengajuan(data) {
      return resource.post(endpoints.mutasiMasuk.updatePengajuan, data);
    },
  },
  mutasiKeluar: {
    getPengajuan() {
      return resource.get(endpoints.mutasiKeluar.pengajuan);
    },
    buatPengajuan(data) {
      return resource.post(endpoints.mutasiKeluar.buatPengajuan, data);
    },
    updatePengajuan(data) {
      return resource.post(
        endpoints.mutasiKeluar.updatePengajuan,
        clean({ ...data })
      );
    },
  },
  profile: {
    getStr() {
      return resource.get(endpoints.profile.str);
    },
    createStr(data) {
      return resource.post(endpoints.profile.createStr, data);
    },
    getPendidikan() {
      return resource.get(endpoints.profile.pendidikan);
    },
    createPendidikan(data) {
      return resource.post(endpoints.profile.createPendidikan, data);
    },
    updateProfile(id, data) {
      return resource.put(
        `${endpoints.profile.default}/${id}/${endpoints.profile.update}`,
        data
      );
    },
  },
  rekomendasi: {
    getRekomendasi() {
      return resource.get(endpoints.rekomendasi.default);
    },
    getById(id) {
      return resource.get(`${endpoints.rekomendasi.default}/${id}`);
    },
    cancelRecomendation(body) {
      return resource.post(
        `${endpoints.rekomendasi.default}/${endpoints.rekomendasi.cancel}`,
        body
      );
    },
    // input can create and update
    rekomendasiInput(body) {
      return resource.post(
        `${endpoints.rekomendasi.default}/${endpoints.rekomendasi.input}`,
        body
      );
    },
    rekomendasiPublish(body) {
      return resource.post(
        `${endpoints.rekomendasi.default}/${endpoints.rekomendasi.publish}`,
        body
      );
    },
  },
};

export default apis;
