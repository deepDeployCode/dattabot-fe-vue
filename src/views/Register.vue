<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <!-- form -->
      <div class="d-flex justify-content-center mb-2">
        <b-img
          fluid
          width="150"
          height="150"
          :src="simfoniLogo"
          alt="simfoniLogo" />
      </div>
      <validation-observer ref="registerValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <b-form-group label="Opsi Pendaftaran *" label-for="opsi-pendaftaran">
            <validation-provider
              #default="{ errors }"
              name="Opsi Pendaftaran"
              rules="required">
              <b-form-select
                v-model="form.jenis_pendaftaran"
                :state="errors.length > 0 ? false : null"
                :options="optionRegistration" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <div v-if="form.jenis_pendaftaran">
            <b-form-group
              v-if="
                form.jenis_pendaftaran === 'anggota-jakpus' ||
                form.jenis_pendaftaran === 'non-anggota-jakpus'
              "
              label="Nomor Pokok Anggota *"
              label-for="nomor-pokok">
              <validation-provider
                #default="{ errors }"
                name="Nomor Pokok Anggota">
                <b-form-input
                  id="nomor-pokok"
                  v-model="form.npa_idi"
                  :state="errors.length > 0 ? false : null"
                  name="nomor-pokok"
                  type="number" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Nomor Identitas (No.KTP) *"
              label-for="nomor-identitas">
              <validation-provider
                #default="{ errors }"
                name="Nomor Identitas (KTP)"
                rules="required">
                <b-form-input
                  id="nomor-identitas"
                  v-model="form.kartu_id_nomor"
                  :state="errors.length > 0 ? false : null"
                  name="nomor-identitas"
                  type="text" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Nama Lengkap Tanpa Gelar *"
              label-for="nama-lengkap">
              <validation-provider
                #default="{ errors }"
                name="Nama Lengkap Tanpa Gelar"
                rules="required">
                <b-form-input
                  id="nama-lengkap"
                  v-model="form.nama_lengkap"
                  :state="errors.length > 0 ? false : null"
                  name="nama-lengkap"
                  type="text" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tanggal lahir *" label-for="tanggal-lahir">
              <validation-provider
                #default="{ errors }"
                name="Tanggal lahir"
                rules="required">
                <b-form-input
                  id="tanggal-lahir"
                  v-model="form.tanggal_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tanggal-lahir"
                  type="date" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tempat Lahir *" label-for="tempat-lahir">
              <validation-provider
                #default="{ errors }"
                name="Tempat Lahir"
                rules="required">
                <b-form-input
                  id="tempat-lahir"
                  v-model="form.tempat_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tempat-lahir"
                  type="text" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Nama Universitas (FK Dokter Umum) *"
              label-for="nama-univ">
              <validation-provider
                #default="{ errors }"
                name="Nama Universitas (FK Dokter Umum)"
                rules="required">
                <b-form-input
                  id="nama-univ"
                  v-model="form.du_asal_fak_kedokteran"
                  :state="errors.length > 0 ? false : null"
                  name="nama-univ"
                  type="text" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Negara Asal Universitas *"
              label-for="negara-asal-univ">
              <validation-provider
                #default="{ errors }"
                name="Negara Asal Universitas"
                rules="required">
                <b-form-input
                  id="negara-asal-univ"
                  v-model="form.du_asal_negara_univ"
                  :state="errors.length > 0 ? false : null"
                  name="negara-asal-univ"
                  type="text" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Tahun Masuk Pendidikan Dokter Umum *"
              label-for="tahun-masuk-dr-umum">
              <validation-provider
                #default="{ errors }"
                name="Tahun Masuk Pendidikan Dokter Umum"
                rules="required">
                <b-form-input
                  id="tahun-masuk-dr-umum"
                  v-model="form.du_tahun_masuk"
                  :state="errors.length > 0 ? false : null"
                  name="tahun-masuk-dr-umum"
                  type="number" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Tahun Lulus Pendidikan Dokter Umum *"
              label-for="tahun-lulus-dr-umum">
              <validation-provider
                #default="{ errors }"
                name="Tahun Lulus Pendidikan Dokter Umum"
                rules="required">
                <b-form-input
                  id="tahun-lulus-dr-umum"
                  v-model="form.du_tahun_lulus"
                  :state="errors.length > 0 ? false : null"
                  name="tahun-lulus-dr-umum"
                  type="number" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor Handphone *" label-for="nomor-hp">
              <validation-provider
                #default="{ errors }"
                name="Nomor Handphone"
                rules="required">
                <b-form-input
                  id="nomor-hp"
                  v-model="form.nomor_hp"
                  :state="errors.length > 0 ? false : null"
                  name="nomor-hp"
                  type="number" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Email *" label-for="email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email">
                <b-form-input
                  id="email"
                  v-model="form.email"
                  :state="errors.length > 0 ? false : null"
                  name="email"
                  type="email" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Password *" label-for="password">
              <validation-provider
                #default="{ errors }"
                name="password"
                rules="required">
                <b-form-input
                  id="password"
                  v-model="form.password"
                  :state="errors.length > 0 ? false : null"
                  name="password"
                  type="password" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Ketik Ulang Password *"
              label-for="confirm-password">
              <validation-provider
                #default="{ errors }"
                name="confirm"
                rules="required|password:@password">
                <b-form-input
                  id="confirm-password"
                  v-model="confirmPassword"
                  :state="errors.length > 0 ? false : null"
                  name="confirm-password"
                  type="password" />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="File Kartu (KTP) *"
              label-for="kartu_id_file"
              class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="kartu_id_file"
                rules="required">
                <b-form-file
                  id="kartu_id_file"
                  :state="errors.length > 0 ? false : null"
                  v-model="form.kartu_id_file"
                  accept="image/*"
                  @change="handlerKartuFile($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Pas Foto *" label-for="pas-foto" class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="pas-foto"
                rules="required">
                <b-form-file
                  id="pas-foto"
                  :state="errors.length > 0 ? false : null"
                  v-model="form.pasphoto"
                  accept="image/*"
                  @change="handlerPassFoto($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="File KTA (kwitansi iuran) *"
              label-for="file-kta"
              class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="file-kta"
                rules="required">
                <b-form-file
                  id="file-kta"
                  :state="errors.length > 0 ? false : null"
                  v-model="form.npa_file"
                  accept="image/*"
                  @change="handlerFileKta($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit buttons -->
            <b-button
              type="submit"
              variant="outline-danger"
              block
              @click="validationForm">
              Daftar
            </b-button>
          </div>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>Sudah punya akun? </span>
        <b-link :to="{ name: 'login' }">
          <span>&nbsp;Daftar disini</span>
        </b-link>
      </b-card-text>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

extend("confirm", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password tidak sama",
});

import {
  BLink,
  BFormGroup,
  BCardText,
  BForm,
  BButton,
  BFormSelect,
  BFormFile,
  BFormInput,
  BImg,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import apis from "@/api";

export default {
  components: {
    BLink,
    BFormGroup,
    BCardText,
    BForm,
    BButton,
    BFormFile,
    ValidationProvider,
    ValidationObserver,
    BFormSelect,
    BaseNavigation,
    DividerNavigation,
    BFormInput,
    BImg,
    extend,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      simfoniLogo: require("@/assets/images/logo/logo-new-idi.png"),
      status: "",
      password: "home258",
      userEmail: "forumkita.idijakpus@gmail.com",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      confirmPassword: "",
      optionRegistration: [
        {
          value: null,
          text: "Silahkan pilih opsi pendaftaran",
        },
        {
          value: "anggota-jakpus",
          text: "Anggota IDI Jakarta Pusat",
        },
        {
          value: "baru",
          text: "Belum menjadi anggota IDI",
        },
        {
          value: "non-anggota-jakpus",
          text: "Anggota Non IDI Jakarta Pusat",
        },
      ],
      form: {
        email: "",
        password: "",
        npa_idi: "", // 0000
        kartu_id_nomor: "",
        pasphoto: "",
        kartu_id_file: "",
        npa_file: "",
        nama_lengkap: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        du_asal_negara_univ: "Indonesia",
        du_asal_fak_kedokteran: "",
        du_tahun_masuk: "",
        du_tahun_lulus: "",
        jenis_pendaftaran: null,
        nomor_hp: "",
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    validationForm() {
      this.$refs.registerValidation.validate().then((success) => {
        if (success) {
          this.register();
        }
      });
    },

    // handler img passfoto and file kartu(ktp)
    handlerPassFoto(e) {
      const { files } = e.target;
      if (files.length) {
        this.createPassfoto(files[0], (result) => {
          this.pasphoto = result;
        });
      }
    },

    createPassfoto(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    handlerKartuFile(e) {
      const { files } = e.target;
      if (files.length) {
        this.createKartuFile(files[0], (result) => {
          this.kartu_id_file = result;
        });
      }
    },

    createKartuFile(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    handlerFileKta(e) {
      const { files } = e.target;
      if (files.length) {
        this.createFileNpa(files[0], (result) => {
          this.npa_file = result;
        });
      }
    },

    createFileNpa(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    register() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      const newForm = { ...this.form };
      if (this.form.jenis_pendaftaran === "baru") {
        newForm.npa_idi = "0000";
      }
      var insertData = {
        ...this.form,
        kartu_id_file: this.kartu_id_file,
        pasphoto: this.pasphoto,
        npa_file: this.npa_file,
      };
      apis.auth
        .register(insertData)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title:
                "Register berhasil, Silahkan cek email dan temukan informasi untuk login",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.$router.push({ path: "/login", replace: true });
        })
        .catch((error) => {
          this.errorHandler(error, "regsiter gagal, silahkan coba lagi nanti");
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
