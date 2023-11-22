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
    validateEmailBeforeRegister: "/auth/validateEmail",
    restoreDataUsers: "/auth/restore/data",
    register: "/auth/register",
    user: "/auth/user",
    verify: "/auth/verify",
  },
  /**
   * BEGIN::authentication v2
   */

  authv2: {
    checkRegistered: "/auth/v2/check-registered",
    login: "/auth/v2/login",
    verify: "/auth/v2/verify",
    register: "/auth/v2/register",
  },
  /**
   * END::authentication v2
   */
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
    notification: {
      index: "/profile/notifikasi",
      detail: "detail",
      count: "count",
    },
    kompetensi: {
      defaultKompetensi: "kompentensi",
      create: "create",
      delete: "delete",
    },
  },
  rekomendasi: {
    default: "/recommendation",
    cancel: "cancel",
    form: "create/forms",
    input: "input",
    publish: "invoices",
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
  webinar: {
    index: "/p2kb/webinar",
    eventWebinar: "/p2kb/webinar/list/event",
    daftar: "create",
    detail: "detail",
    delete: "delete",
    check: "check",
    sertifikat: "sertifikat",
  },
  pembayaran: {
    index: "/pembayaran",
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
    validateEmailBeforeRegister(email) {
      return resource.post(endpoints.auth.validateEmailBeforeRegister, email);
    },
    restoreDataUsers(email) {
      return resource.post(endpoints.auth.restoreDataUsers, email);
    },
  },
  /**
   * auth v2 register
   */

  authv2: {
    login(data) {
      return resource.post(endpoints.authv2.login, data);
    },

    register(data) {
      return resource.post(endpoints.authv2.register, data);
    },
    checkRegistered(data) {
      return resource.post(`${endpoints.authv2.checkRegistered}`, data);
    },

    verifyAccount(npa) {
      return resource.post(`${endpoints.authv2.verify}/${npa}`);
    },
  },
  /**
   * end auth v2 register
   */
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
  pembayaran: {
    setDetailDataBayar(idBayar) {
      return resource.get(`${endpoints.pembayaran.index}/${idBayar}`);
    },

    setBayar(idBayar, filebayar) {
      return resource.post(
        `${endpoints.pembayaran.index}/${idBayar}`,
        filebayar
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
    //notification
    notification(url = endpoints.profile.notification.index) {
      return resource.post(url);
    },
    notificationDetail(id_notification) {
      return resource.post(
        `${endpoints.profile.notification.index}/${id_notification}/${endpoints.profile.notification.detail}`
      );
    },
    notificationCount() {
      return resource.post(
        `${endpoints.profile.notification.index}/${endpoints.profile.notification.count}`
      );
    },
    //end notification
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
    getKompetensi(
      url = `${endpoints.profile.default}/${endpoints.profile.kompetensi.defaultKompetensi}`
    ) {
      return resource.get(url);
    },
    createKompetensi(body) {
      return resource.post(
        `${endpoints.profile.default}/${endpoints.profile.kompetensi.defaultKompetensi}/${endpoints.profile.kompetensi.create}`,
        body
      );
    },
    deleteKompetensi(id) {
      return resource.delete(
        `${endpoints.profile.default}/${endpoints.profile.kompetensi.defaultKompetensi}/${id}/${endpoints.profile.kompetensi.delete}`
      );
    },
  },
  rekomendasi: {
    getRekomendasi() {
      return resource.get(endpoints.rekomendasi.default);
    },
    // this method view of detail data for update data and show invoices
    getById(id) {
      return resource.get(`${endpoints.rekomendasi.default}/${id}`);
    },
    getByForm() {
      return resource.get(
        `${endpoints.rekomendasi.default}/${endpoints.rekomendasi.form}`
      );
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
    rekomendasiInvoices(body) {
      return resource.post(
        `${endpoints.rekomendasi.default}/${endpoints.rekomendasi.publish}`,
        body
      );
    },
  },
  webinar: {
    listRegisterWebinar(url = endpoints.webinar.index) {
      return resource.get(url);
    },
    listWebinarEvent(url = endpoints.webinar.eventWebinar) {
      return resource.get(url);
    },
    detailsWebinar(id_webinar) {
      return resource.post(
        `${endpoints.webinar.index}/${id_webinar}/${endpoints.webinar.detail}`
      );
    },
    registerWebinar(body) {
      return resource.post(
        `${endpoints.webinar.index}/${endpoints.webinar.daftar}`,
        body
      );
    },
    cancelWebinar(idWebinar) {
      return resource.delete(
        `${endpoints.webinar.index}/${idWebinar}/${endpoints.webinar.delete}`
      );
    },
    checkWebinarStatus(idWebinar) {
      return resource.post(
        `${endpoints.webinar.index}/${idWebinar}/${endpoints.webinar.check}`
      );
    },
    sertifikatWebinar(id) {
      return resource.post(
        `${endpoints.webinar.index}/${id}/${endpoints.webinar.sertifikat}`
      );
    },
  },
};

export default apis;
