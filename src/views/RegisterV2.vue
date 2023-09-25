<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div v-if="npa.data.status != true" class="p-2 mx-auto">
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
            @click="validateNpa"
          >
            Cek NPA Idi Jakpus
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
            <b-card-text v-if="npa.data.message">
              <p v-if="npa.data.login == true">
                {{ npa.data.message }}
              </p>
              <p v-else>
                {{
                  "Masukan NPA untuk check status daftar anda di sistem kami"
                }}
              </p>
              <b-button
                v-if="npa.data.login === true"
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
            Cek NPA PB idi
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
              <p v-if="validate.data.status == true">
                {{ validate.data.message }}
              </p>
              <p v-else>
                {{
                  "anda belum terdaftar di sistem kami, mohon untuk lanjutkan process pengecekan data di pbidi untuk register di sistem kami"
                }}
              </p>
              <b-button
                v-if="validate.data.status === true"
                type="submit"
                variant="outline-info"
                block
                @click="
                  $router.push(`/v2/register/${validate.data.data.npa}/submit`)
                "
              >
                Lanjutkan Register?
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
                    <td>NPA</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.npa }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Wilayah</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_wilayah }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Cabang</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_cabang }}
                    </td>
                  </tr>
                  <tr>
                    <td>Nama Lengkap</td>
                    <td class="font-weight-bold">
                      : {{ validate.data.data.nama_lengkap }}
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal Daftar</td>
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
    validateNpa() {
      this.$refs.validateBeforeRegister.validate().then((success) => {
        if (success) {
          this.checkNpaBeforeRegister();
        }
      });
    },
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
