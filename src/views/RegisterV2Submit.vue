<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex justify-content-center mb-2">
        <b-img
          fluid
          width="150"
          height="150"
          :src="simfoniLogo"
          alt="simfoniLogo"
        />
      </div>
      <!-- form -->
      <div class="d-flex justify-content-center mb-2"></div>
      <validation-observer ref="registerValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <div>
            <b-form-group label="Level *" label-for="level">
              <validation-provider
                #default="{ errors }"
                name="Level"
                rules="required"
              >
                <b-form-input
                  id="level"
                  v-model="integrasi_detail.data.nama_cabang"
                  :state="errors.length > 0 ? false : null"
                  name="level"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="wilayah *" label-for="wilayah">
              <validation-provider
                #default="{ errors }"
                name="wilayah"
                rules="required"
              >
                <b-form-input
                  id="wilayah"
                  v-model="integrasi_detail.data.nama_wilayah"
                  :state="errors.length > 0 ? false : null"
                  name="wilayah"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="npa *" label-for="npa">
              <validation-provider
                #default="{ errors }"
                name="npa"
                rules="required"
              >
                <b-form-input
                  id="npa"
                  v-model="integrasi_detail.data.npa"
                  :state="errors.length > 0 ? false : null"
                  name="npa"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="npa masa berlaku *"
              label-for="npa-masa-berlaku"
            >
              <validation-provider
                #default="{ errors }"
                name="npa masa berlaku"
                rules="required"
              >
                <b-form-input
                  id="npa-masa-berlaku"
                  v-model="integrasi_detail.data.npa_masaberlaku"
                  :state="errors.length > 0 ? false : null"
                  name="npa-masa-berlaku"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nama Lengkap *" label-for="nama-lengkap">
              <validation-provider
                #default="{ errors }"
                name="Nama Lengkap"
                rules="required"
              >
                <b-form-input
                  id="nama-lengkap"
                  v-model="integrasi_detail.data.nama_lengkap"
                  :state="errors.length > 0 ? false : null"
                  name="nama-lengkap"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="gelar depan *" label-for="gelar_depan">
              <validation-provider
                #default="{ errors }"
                name="gelar depan"
                rules="required"
              >
                <b-form-input
                  id="gelar_depan"
                  v-model="integrasi_detail.data.prefix"
                  :state="errors.length > 0 ? false : null"
                  name="gelar_depan"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="gelar belakang" label-for="gelar_belakang">
              <validation-provider #default="{ errors }" name="gelar belakang">
                <b-form-input
                  id="gelar_belakang"
                  v-model="integrasi_detail.data.suffix"
                  :state="errors.length > 0 ? false : null"
                  name="gelar_belakang"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="tempat lahir *" label-for="tempat_lahir">
              <validation-provider
                #default="{ errors }"
                name="tempat lahir"
                rules="required"
              >
                <b-form-input
                  id="tempat_lahir"
                  v-model="integrasi_detail.data.tempat_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tempat_lahir"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="tanggal lahir *" label-for="tanggal_lahir">
              <validation-provider
                #default="{ errors }"
                name="tanggal lahir"
                rules="required"
              >
                <b-form-input
                  id="tanggal_lahir"
                  v-model="integrasi_detail.data.tanggal_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tanggal_lahir"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Jenis Kelamin *" label-for="jenis_kelamin">
              <validation-provider
                #default="{ errors }"
                name="jenis_kelamin"
                rules="required"
              >
                <b-form-input
                  id="jenis_kelamin"
                  v-model="integrasi_detail.data.jenis_kelamin"
                  :state="errors.length > 0 ? false : null"
                  name="jenis_kelamin"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Kartu Jenis *" label-for="Kartu Jenis">
              <validation-provider
                #default="{ errors }"
                name="kartu_id_jenis"
                rules="required"
              >
                <b-form-input
                  id="kartu_id_jenis"
                  v-model="integrasi_detail.data.jenis_identitas"
                  :state="errors.length > 0 ? false : null"
                  name="kartu_id_jenis"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor KTP *" label-for="kartu_id_nomor">
              <validation-provider
                #default="{ errors }"
                name="Nomor KTP"
                rules="required"
              >
                <b-form-input
                  id="kartu_id_nomor"
                  v-model="integrasi_detail.data.no_identitas"
                  :state="errors.length > 0 ? false : null"
                  name="kartu_id_nomor"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Pernikahan Status"
              label-for="pernikahan-status"
            >
              <validation-provider
                #default="{ errors }"
                name="Pernikahan Status"
              >
                <b-form-select
                  v-model="integrasi_detail.data.pernikahan_status"
                  :state="errors.length > 0 ? false : null"
                  :options="optionRegistration"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Pernikahan Nama Pasangan"
              label-for="pernikahan_nama_pasangan"
            >
              <validation-provider
                #default="{ errors }"
                name="Pernikahan Nama Pasangan"
              >
                <b-form-input
                  id="pernikahan_nama_pasangan"
                  v-model="integrasi_detail.data.nama_pasangan"
                  :state="errors.length > 0 ? false : null"
                  name="pernikahan_nama_pasangan"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Alamat Rumah *" label-for="alamat_rumah">
              <validation-provider
                #default="{ errors }"
                name="Alamat Rumah"
                rules="required"
              >
                <b-form-input
                  id="alamat_rumah"
                  v-model="integrasi_detail.data.alamat"
                  :state="errors.length > 0 ? false : null"
                  name="alamat_rumah"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor HP *" label-for="nomor_hp">
              <validation-provider
                #default="{ errors }"
                name="no hp"
                rules="required"
              >
                <b-form-input
                  id="nomor_hp"
                  v-model="integrasi_detail.data.no_hp_1"
                  :state="errors.length > 0 ? false : null"
                  name="nomor_hp"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor Telpon" label-for="nomor_telpon">
              <validation-provider #default="{ errors }" name="nomor tempon">
                <b-form-input
                  id="nomor_telpon"
                  v-model="integrasi_detail.data.telp_rumah"
                  :state="errors.length > 0 ? false : null"
                  name="nomor_telpon"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="email *" label-for="email">
              <validation-provider
                #default="{ errors }"
                name="email"
                rules="required"
              >
                <b-form-input
                  id="email"
                  v-model="integrasi_detail.data.email_account"
                  :state="errors.length > 0 ? false : null"
                  name="email"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="password *" label-for="password">
              <validation-provider
                #default="{ errors }"
                name="password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="integrasi_detail.data.password"
                    :state="errors.length > 0 ? false : null"
                    class="form-control-merge"
                    name="password"
                    :type="passwordFieldType"
                    placeholder=".............."
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Ketik Ulang Password *"
              label-for="confirm-password"
            >
              <validation-provider
                #default="{ errors }"
                name="confirm"
                rules="required|password:@password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="confirm-password"
                    v-model="confirmPassword"
                    :state="errors.length > 0 ? false : null"
                    name="confirm-password"
                    class="form-control-merge"
                    :type="passwordFieldType"
                    placeholder="..............."
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>

            <!-- file upload-->
            <b-form-group label="Photo *" label-for="photo" class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="photo"
                rules="required"
              >
                <b-form-file
                  id="photo"
                  :state="errors.length > 0 ? false : null"
                  v-model="upload.file_photo_resmi"
                  accept="image/*"
                  @change="handlerPhotoResmi($event)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="File KTA/Kwitansi Iuran *"
              label-for="file-kta-kwitansi-iuran"
              class="mt-1"
            >
              <validation-provider
                #default="{ errors }"
                name="file-kta-kwitansi-iuran"
                rules="required"
              >
                <b-form-file
                  id="file-kta-kwitansi-iuran"
                  :state="errors.length > 0 ? false : null"
                  v-model="upload.npa_file"
                  accept="image/*"
                  @change="handlerFileKta($event)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Photo KTP *"
              label-for="photo-ktp"
              class="mt-1"
            >
              <validation-provider
                #default="{ errors }"
                name="photo-ktp"
                rules="required"
              >
                <b-form-file
                  id="photo-ktp"
                  :state="errors.length > 0 ? false : null"
                  v-model="upload.kartu_id_file"
                  accept="image/*"
                  @change="handlerFileKTP($event)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- end upload file-->

            <!-- submit buttons -->
            <b-button
              type="submit"
              variant="outline-danger"
              block
              @click="validationForm"
            >
              Daftar
            </b-button>
          </div>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>Sudah punya akun? </span>
        <b-link :to="{ name: 'login' }">
          <span>&nbsp;Login disini</span>
        </b-link>
      </b-card-text>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

extend("password", {
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
  BInputGroupAppend,
  BInputGroup,
  BModal,
  BCard,
  BButton,
  BCardTitle,
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
    BModal,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BCard,
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
      optionRegistration: ["Belum Menikah", "Sudah Menikah"],
      // validation rulesimport store from '@/store/index'
      required,
      email,
      passwordFieldType: "password",
      colorVerifyStatusAccount: [{ bg: "danger", title: "Danger card title" }],
      integrasi_detail: {
        data: null,
        isLoading: false,
      },
      upload: {
        file_photo_resmi: "",
        npa_file: "", //file kta/iuran
        kartu_id_file: "", //file ktp
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeOffIcon" : "EyeIcon";
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
  created() {
    this.fetchValidatePbIdiDetails();
  },

  methods: {
    validationForm() {
      this.$refs.registerValidation.validate().then((success) => {
        if (success) {
          this.register();
        }
      });
    },

    // handler file KTA
    handlerFileKta(e) {
      const { files } = e.target;
      if (files.length) {
        this.createFileKTA(files[0], (result) => {
          this.upload.npa_file = result;
        });
      }
    },

    createFileKTA(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    // handler file pas photo
    handlerPhotoResmi(e) {
      const { files } = e.target;
      if (files.length) {
        this.createPhotoFIle(files[0], (result) => {
          this.upload.file_photo_resmi = result;
        });
      }
    },

    createPhotoFIle(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    // handler file ktp
    handlerFileKTP(e) {
      const { files } = e.target;
      if (files.length) {
        this.createFileKTP(files[0], (result) => {
          this.upload.kartu_id_file = result;
        });
      }
    },

    createFileKTP(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    fetchValidatePbIdiDetails() {
      this.integrasi_detail.isLoading = true;
      apis.authv2
        .detailDataPbIdi({ npa: this.$route.params.npa_idi })
        .then(({ data }) => {
          this.integrasi_detail.data = data.data;
        })
        .catch((error) => {
          this.errorHandler(error, "gagal detail npa");
        })
        .finally(() => {
          this.integrasi_detail.isLoading = false;
        });
    },

    register() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      var insertData = {
        orang_level: this.integrasi_detail.data.nama_cabang,
        orang_level_wilayah: this.integrasi_detail.data.nama_wilayah,
        orang_npa_idi: this.integrasi_detail.data.npa,
        orang_npa_masa_berlaku: this.integrasi_detail.data.npa_masaberlaku,
        orang_npa_file: this.upload.npa_file, // file kta/iuran
        orang_nama_lengkap: this.integrasi_detail.data.nama_lengkap,
        orang_gelar_depan: this.integrasi_detail.data.prefix,
        orang_gelar_belakang: this.integrasi_detail.data.suffix,
        orang_tempat_lahir: this.integrasi_detail.data.tempat_lahir,
        orang_tanggal_lahir: this.integrasi_detail.data.tanggal_lahir,
        orang_jenis_kelamin: this.integrasi_detail.data.jenis_kelamin,
        orang_kartu_id_jenis: this.integrasi_detail.data.jenis_identitas,
        orang_kartu_id_nomor: this.integrasi_detail.data.no_identitas,
        orang_kartu_id_file: this.upload.kartu_id_file, // file ktp
        orang_pernikahan_status: this.integrasi_detail.data.pernikahan_status,
        orang_pernikahan_nama_pasangan:
          this.integrasi_detail.data.nama_pasangan,
        orang_alamat_rumah: this.integrasi_detail.data.alamat,
        orang_nomor_hp: this.integrasi_detail.data.no_hp_1,
        orang_nomor_telpon: this.integrasi_detail.data.telp_rumah,
        orang_file_photo_resmi: this.upload.file_photo_resmi, // photo profile
        orang_email: this.integrasi_detail.data.email_account,
        orang_password: this.integrasi_detail.data.password,
      };
      apis.authv2
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
