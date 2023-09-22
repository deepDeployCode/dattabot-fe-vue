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
                v-model="npaValidate"
                :state="errors.length > 0 ? false : null"
                name="cek-npa"
                placeholder="12838281"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- submit buttons -->
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validateNpaPbIdi"
          >
            Cek NPA
          </b-button>
        </b-form>
      </validation-observer>
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
            <b-card-text v-if="validate.data.message">
              <p>
                {{ validate.data.message }}
              </p>
              <p>{{ npa.data.message }}</p>
              <b-button
                v-if="validate.data.status === 'true'"
                type="submit"
                variant="outline-info"
                block
                @click="checkNpaBeforeRegister()"
              >
                Check Registered?
              </b-button>
              <b-button
                v-if="npa.data.status === 'true'"
                type="submit"
                variant="outline-info"
                block
                @click="
                  $router.push(`/v2/register/${validate.data.data.npa}/submit`)
                "
              >
                Lanjutkan?
              </b-button>
              <b-button
                v-else-if="npa.data.status === 'false'"
                type="submit"
                variant="outline-info"
                block
                @click="$router.push(`/login`)"
              >
                login
              </b-button>
            </b-card-text>
          </b-card>
          <b-card
            v-if="validate.data.data"
            class="shadow-none border mb-1"
            no-body
          >
            <div class="d-flex p-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  #Data From PBIDI - {{ validate.data.data.nama_lengkap }}
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
                    <td>npa</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.npa }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_wilayah</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_wilayah }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_cabang</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_cabang }}
                    </td>
                  </tr>
                  <tr>
                    <td>jenis_identitas</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.jenis_identitas }}
                    </td>
                  </tr>
                  <tr>
                    <td>no_identitas</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.no_identitas }}
                    </td>
                  </tr>
                  <tr>
                    <td>prefix</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.prefix }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_depan</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_depan }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_tengah</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_tengah }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_belakang</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_belakang }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_lengkap</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_lengkap }}
                    </td>
                  </tr>
                  <tr>
                    <td>suffix</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.suffix }}
                    </td>
                  </tr>
                  <tr>
                    <td>tempat_lahir</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.tempat_lahir }}
                    </td>
                  </tr>
                  <tr>
                    <td>tanggal_lahir</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.tanggal_lahir }}
                    </td>
                  </tr>
                  <tr>
                    <td>jenis_kelamin</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.jenis_kelamin }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_negara</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_negara }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_agama</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_agama }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_pasangan</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_pasangan }}
                    </td>
                  </tr>
                  <tr>
                    <td>alamat</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.alamat }}
                    </td>
                  </tr>
                  <tr>
                    <td>rt</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.rt }}
                    </td>
                  </tr>
                  <tr>
                    <td>rw</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.rw }}
                    </td>
                  </tr>
                  <tr>
                    <td>kode_pos</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.kode_pos }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_provinsi</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_provinsi }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kab_kota</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kab_kota }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kecamatan</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kecamatan }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kelurahan</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kelurahan }}
                    </td>
                  </tr>
                  <tr>
                    <td>kode_area</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.kode_area }}
                    </td>
                  </tr>
                  <tr>
                    <td>telp_rumah</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.telp_rumah }}
                    </td>
                  </tr>
                  <tr>
                    <td>jenis_hp_1</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.jenis_hp_1 }}
                    </td>
                  </tr>
                  <tr>
                    <td>kode</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.kode }}
                    </td>
                  </tr>
                  <tr>
                    <td>no_hp_1</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.no_hp_1 }}
                    </td>
                  </tr>
                  <tr>
                    <td>jenis_hp_2</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.jenis_hp_2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>no_hp_2</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.no_hp_2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>email_daftar</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.email_daftar }}
                    </td>
                  </tr>
                  <tr>
                    <td>email_account</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.email_account }}
                    </td>
                  </tr>
                  <tr>
                    <td>sesuai_ktp</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.sesuai_ktp }}
                    </td>
                  </tr>
                  <tr>
                    <td>alamat_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.alamat_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_provinsi_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_provinsi_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kab_kota_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kab_kota_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kecamatan_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kecamatan_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>nama_kelurahan_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_kelurahan_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>rt_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.rt_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>rw_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.rw_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>kode_pos_kor</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.kode_pos_kor }}
                    </td>
                  </tr>
                  <tr>
                    <td>tanggal_daftar</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.tanggal_daftar }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-card>
        </b-col>
        <!-- submit buttons -->
      </div>
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
  BModal,
  BCard,
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
    BModal,
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
      validate: {
        data: null,
        isLoading: false,
      },
      npa: {
        data: null,
        isLoading: false,
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  created() {
    this.fetchValidatePbIdi();
    this.checkNpaBeforeRegister();
  },
  methods: {
    validateNpaPbIdi() {
      this.$refs.validateBeforeRegister.validate().then((success) => {
        if (success) {
          this.fetchValidatePbIdi();
        }
      });
    },

    fetchValidatePbIdi() {
      this.validate.isLoading = true;
      apis.authv2
        .npaBeforeRegister({
          npa: this.npaValidate != null ? this.npaValidate : null,
        })
        .then(({ data }) => {
          this.validate.data = data;
        })
        .catch((error) => {
          this.errorHandler(error, "gagal validate npa");
        })
        .finally(() => {
          this.validate.isLoading = false;
        });
    },

    checkNpaBeforeRegister() {
      this.npa.isLoading = true;
      apis.authv2
        .checkRegistered({ npa: this.npaValidate })
        .then(({ data }) => {
          this.npa.data = data;
        })
        .catch((error) => this.errorHandler(error, "gagal validate npa"))
        .finally(() => {
          this.npa.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
