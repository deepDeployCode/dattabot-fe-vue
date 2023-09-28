<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div v-if="npa.data.status != true" class="p-2 mx-auto">
      <div class="d-flex justify-content-center mb-2">
        <b-img
          fluid
          width="150"
          height="150"
          :src="simfoniLogo"
          alt="simfoniLogo"
        />
      </div>
      <validation-observer ref="validateBeforeRegister">
        <b-form class="auth-login-form" @submit.prevent>
          <b-form-group label="NPA" label-for="npa-validate">
            <validation-provider
              #default="{ errors }"
              name="Npa"
              rules="required|integer"
            >
              <b-form-input
                id="cek-npa"
                v-model="npa_validate"
                :state="errors.length > 0 ? false : null"
                name="cek-npa"
                placeholder="8572712"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Tanggal Lahir" label-for="tanggal-lahir">
            <validation-provider
              #default="{ errors }"
              name="Tanggal Lahir"
              rules="required"
            >
              <b-form-input
                id="cek-tanggal-lahir"
                v-model="tanggal_lahir_validate"
                :state="errors.length > 0 ? false : null"
                name="cek-tanggal-lahir"
                type="date"
                placeholder="mm/dd/yy"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Tanggal Daftar PB IDI"
            label-for="tanggal-daftar"
          >
            <validation-provider
              #default="{ errors }"
              name="Tanggal Daftar PB IDI"
              rules="required"
            >
              <b-form-input
                id="cek-tanggal-daftar-pb-idi"
                v-model="tanggal_daftar_pbidi_validate"
                :state="errors.length > 0 ? false : null"
                name="cek-tanggal-daftar"
                type="date"
                placeholder="mm/dd/yy"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- submit buttons -->
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validateNpa"
          >
            Check
          </b-button>
        </b-form>
      </validation-observer>
      <br />
      <div v-if="npa.data.login == true">
        <div class="d-flex align-self-center">
          <feather-icon
            icon="InfoIcon"
            size="20"
            stroke-width="2"
            class="mr-1"
          />
          <h4>Status Account</h4>
        </div>
        <div>
          <b-col
            v-for="(data, index) in colorVerifyStatusAccount"
            :key="index"
            md="6"
            xl="4"
          >
            <b-card :bg-variant="data.bg" text-variant="white">
              <b-card-text v-if="npa.data.message">
                <p>
                  {{ npa.data.message }}
                </p>
                <b-button
                  type="submit"
                  variant="outline-info"
                  block
                  @click="$router.push(`/login`)"
                >
                  Login
                </b-button>
              </b-card-text>
            </b-card>
          </b-col>
          <!-- submit buttons -->
        </div>
      </div>
      <div v-if="npa.data.pbidi == true">
        <div class="d-flex align-self-center">
          <feather-icon
            icon="InfoIcon"
            size="20"
            stroke-width="2"
            class="mr-1"
          />
          <h4>Status Account</h4>
        </div>
        <div>
          <b-col
            v-for="(data, index) in colorVerifyStatusAccount"
            :key="index"
            md="6"
            xl="4"
          >
            <b-card :bg-variant="data.bg" text-variant="white">
              <b-card-text v-if="npa.data.message">
                <p>
                  {{ npa.data.message }}
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <!-- submit buttons -->
        </div>
      </div>
      <div v-if="npa.data.tanggal_lahir == true">
        <div class="d-flex align-self-center">
          <feather-icon
            icon="InfoIcon"
            size="20"
            stroke-width="2"
            class="mr-1"
          />
          <h4>Status Account</h4>
        </div>
        <div>
          <b-col
            v-for="(data, index) in colorVerifyStatusAccount"
            :key="index"
            md="6"
            xl="4"
          >
            <b-card :bg-variant="data.bg" text-variant="white">
              <b-card-text v-if="npa.data.message">
                <p>
                  {{ npa.data.message }}
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <!-- submit buttons -->
        </div>
      </div>
      <div v-if="npa.data.tanggal_daftar == true">
        <div class="d-flex align-self-center">
          <feather-icon
            icon="InfoIcon"
            size="20"
            stroke-width="2"
            class="mr-1"
          />
          <h4>Status Account</h4>
        </div>
        <div>
          <b-col
            v-for="(data, index) in colorVerifyStatusAccount"
            :key="index"
            md="6"
            xl="4"
          >
            <b-card :bg-variant="data.bg" text-variant="white">
              <b-card-text v-if="npa.data.message">
                <p>
                  {{ npa.data.message }}
                </p>
              </b-card-text>
            </b-card>
          </b-col>
          <!-- submit buttons -->
        </div>
      </div>
    </div>
    <div v-else class="p-2 mx-auto">
      <!-- form -->
      <div class="d-flex justify-content-center mb-2">
        <b-img
          fluid
          width="150"
          height="150"
          :src="simfoniLogo"
          alt="simfoniLogo"
        />
      </div>
      <br />
      <div class="d-flex align-self-center">
        <feather-icon icon="InfoIcon" size="20" stroke-width="2" class="mr-1" />
        <h4>Status Account</h4>
      </div>
      <div>
        <b-col
          v-for="(data, index) in colorVerifyStatusAccount"
          :key="index"
          md="6"
          xl="4"
        >
          <b-card :bg-variant="data.bg" text-variant="white">
            <b-card-text v-if="npa.data.message">
              {{ npa.data.message }}
              {{ "dan mohon mengisi form dibawah ini untuk registrasi" }}
            </b-card-text>
          </b-card>
          <b-card v-if="npa.data.data" class="shadow-none border mb-1" no-body>
            <div class="d-flex p-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  #Data From PBIDI - {{ npa.data.data.nama_lengkap }}
                </div>
                <!-- <b-badge variant="clight-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>
            <div class="p-1">
              <table>
                <tbody>
                  <tr>
                    <td>NPA</td>
                    <td class="font-weight-bold">: {{ npa.data.data.npa }}</td>
                  </tr>
                  <tr>
                    <td>Nama Wilayah</td>
                    <td class="font-weight-bold">
                      : {{ npa.data.data.nama_wilayah }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Cabang</td>
                    <td class="font-weight-bold">
                      : {{ npa.data.data.nama_cabang }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td class="font-weight-bold">
                      : {{ npa.data.data.nama_lengkap }}
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Daftar</td>
                    <td class="font-weight-bold">
                      : {{ npa.data.data.tanggal_daftar }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col>
      </div>
      <!-- register state -->
      <!-- form -->
      <div class="d-flex justify-content-center mb-2"></div>
      <validation-observer ref="registerValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <div>
            <b-form-group label="Level" label-for="level">
              <validation-provider #default="{ errors }" name="Level">
                <b-form-input
                  id="level"
                  v-model="npa.data.data.nama_cabang"
                  :state="errors.length > 0 ? false : null"
                  name="level"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="wilayah" label-for="wilayah">
              <validation-provider #default="{ errors }" name="wilayah">
                <b-form-input
                  id="wilayah"
                  v-model="npa.data.data.nama_wilayah"
                  :state="errors.length > 0 ? false : null"
                  name="wilayah"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="npa" label-for="npa">
              <validation-provider #default="{ errors }" name="npa">
                <b-form-input
                  id="npa"
                  v-model="npa.data.data.npa"
                  :state="errors.length > 0 ? false : null"
                  name="npa"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tanggal Daftar" label-for="tanggal-daftar">
              <validation-provider
                #default="{ errors }"
                name="tanggal-daftar"
                rules="required"
              >
                <b-form-input
                  id="tangal-daftar"
                  v-model="npa.data.data.tanggal_daftar"
                  :state="errors.length > 0 ? false : null"
                  name="tangal-daftar"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nama Lengkap" label-for="nama-lengkap">
              <validation-provider #default="{ errors }" name="Nama Lengkap">
                <b-form-input
                  id="nama-lengkap"
                  v-model="npa.data.data.nama_lengkap"
                  :state="errors.length > 0 ? false : null"
                  name="nama-lengkap"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="gelar depan" label-for="gelar_depan">
              <validation-provider #default="{ errors }" name="gelar depan">
                <b-form-input
                  id="gelar_depan"
                  v-model="npa.data.data.prefix"
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
                  v-model="npa.data.data.suffix"
                  :state="errors.length > 0 ? false : null"
                  name="gelar_belakang"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="tempat lahir" label-for="tempat_lahir">
              <validation-provider #default="{ errors }" name="tempat lahir">
                <b-form-input
                  id="tempat_lahir"
                  v-model="npa.data.data.tempat_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tempat_lahir"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="tanggal lahir" label-for="tanggal_lahir">
              <validation-provider #default="{ errors }" name="tanggal lahir">
                <b-form-input
                  id="tanggal_lahir"
                  v-model="npa.data.data.tanggal_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tanggal_lahir"
                  type="date"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Jenis Kelamin" label-for="jenis_kelamin">
              <validation-provider #default="{ errors }" name="jenis_kelamin">
                <b-form-input
                  id="jenis_kelamin"
                  v-model="npa.data.data.jenis_kelamin"
                  :state="errors.length > 0 ? false : null"
                  name="jenis_kelamin"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Kartu Jenis" label-for="Kartu Jenis">
              <validation-provider #default="{ errors }" name="kartu_id_jenis">
                <b-form-input
                  id="kartu_id_jenis"
                  v-model="npa.data.data.jenis_identitas"
                  :state="errors.length > 0 ? false : null"
                  name="kartu_id_jenis"
                  type="text"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor KTP" label-for="kartu_id_nomor">
              <validation-provider #default="{ errors }" name="Nomor KTP">
                <b-form-input
                  id="kartu_id_nomor"
                  v-model="npa.data.data.no_identitas"
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
                  v-model="npa.data.data.pernikahan_status"
                  :state="errors.length > 0 ? false : null"
                  :options="optionPernikahan"
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
                  v-model="npa.data.data.nama_pasangan"
                  :state="errors.length > 0 ? false : null"
                  name="pernikahan_nama_pasangan"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Alamat Rumah " label-for="alamat_rumah">
              <validation-provider #default="{ errors }" name="Alamat Rumah">
                <b-form-input
                  id="alamat_rumah"
                  v-model="npa.data.data.alamat"
                  :state="errors.length > 0 ? false : null"
                  name="alamat_rumah"
                />
                <small class="text-danger">
                  {{ errors[0] }}
                </small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor HP" label-for="nomor_hp">
              <validation-provider #default="{ errors }" name="no hp">
                <b-form-input
                  id="nomor_hp"
                  v-model="npa.data.data.no_hp_1"
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
                  v-model="npa.data.data.telp_rumah"
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
                  v-model="npa.data.data.email_account"
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
                    v-model="npa.data.data.password"
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
            <b-form-group label="Photo" label-for="photo" class="mt-1">
              <validation-provider #default="{ errors }" name="photo">
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
              label="File KTA/Kwitansi Iuran"
              label-for="file-kta-kwitansi-iuran"
              class="mt-1"
            >
              <validation-provider
                #default="{ errors }"
                name="file-kta-kwitansi-iuran"
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
            <b-form-group label="Photo KTP" label-for="photo-ktp" class="mt-1">
              <validation-provider #default="{ errors }" name="photo-ktp">
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

      <!-- redirect to login if you have been registered -->
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
      // validation rulesimport store from '@/store/index'
      required,
      colorVerifyStatusAccount: [{ bg: "danger", title: "Danger card title" }],
      optionPernikahan: ["Belum Menikah", "Sudah Menikah"],
      npa: {
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
  },
  created() {
    this.checkNpaBeforeRegister();
  },
  methods: {
    validateNpa() {
      this.$refs.validateBeforeRegister.validate().then((success) => {
        if (success) {
          this.checkNpaBeforeRegister();
        }
      });
    },

    checkNpaBeforeRegister() {
      this.npa.isLoading = true;
      apis.authv2
        .checkRegistered({
          npa: this.npa_validate,
          tanggal_lahir: this.tanggal_lahir_validate,
          tanggal_daftar: this.tanggal_daftar_pbidi_validate,
        })
        .then(({ data }) => {
          this.npa.data = data;
        })
        .catch((error) => this.errorHandler(error, "gagal validate npa"))
        .finally(() => {
          this.npa.isLoading = false;
        });
    },

    // state register(submit) data registrasi
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

    register() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      var insertData = {
        orang_level: this.npa.data.data.nama_cabang,
        orang_level_wilayah: this.npa.data.data.nama_wilayah,
        orang_npa_idi: this.npa.data.data.npa,
        orang_npa_masa_berlaku: this.npa.data.data.tanggal_daftar,
        orang_npa_file: this.upload.npa_file, // file kta/iuran
        orang_nama_lengkap: this.npa.data.data.nama_lengkap,
        orang_gelar_depan: this.npa.data.data.prefix,
        orang_gelar_belakang: this.npa.data.data.suffix,
        orang_tempat_lahir: this.npa.data.data.tempat_lahir,
        orang_tanggal_lahir: this.npa.data.data.tanggal_lahir,
        orang_jenis_kelamin: this.npa.data.data.jenis_kelamin,
        orang_kartu_id_jenis: this.npa.data.data.jenis_identitas,
        orang_kartu_id_nomor: this.npa.data.data.no_identitas,
        orang_kartu_id_file: this.upload.kartu_id_file, // file ktp
        orang_pernikahan_status: this.npa.data.data.pernikahan_status,
        orang_pernikahan_nama_pasangan: this.npa.data.data.nama_pasangan,
        orang_alamat_rumah: this.npa.data.data.alamat,
        orang_nomor_hp: this.npa.data.data.no_hp_1,
        orang_nomor_telpon: this.npa.data.data.telp_rumah,
        orang_file_photo_resmi: this.upload.file_photo_resmi, // photo profile
        orang_email: this.npa.data.data.email_account,
        orang_password: this.npa.data.data.password,
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
