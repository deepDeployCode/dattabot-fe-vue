<template>
  <div v-if="orang_status.data.orang_status === true" class="app-wrapper">
    <div class="login-wrapper p-2">
      <div class="d-flex justify-content-center mb-3">
        <b-img
          fluid
          width="100"
          height="100"
          :src="logoSimfoniNew"
          alt="logoSimfoniNew"
        />
      </div>
      <br />
      <div class="d-flex justify-content-center">
        <p>
          <b>
            <h1>Selamat datang!</h1>
          </b>
          <br />
          Silahkan login untuk menggunakan aplikasi layanan terintegrasi
          <b>IDI Cabang Jakarta Pusat</b>
        </p>
      </div>
      <!-- form -->
      <validation-observer ref="loginValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <!-- email -->
          <b-form-group label="Email" label-for="login-email">
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="login-email"
                v-model="userEmail"
                :state="errors.length > 0 ? false : null"
                name="login-email"
                placeholder="john@example.com"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- forgot password -->
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="login-password">Password</label>
              <b-link :to="{ name: 'forget-password' }">
                <small>Lupa Password?</small>
              </b-link>
            </div>
            <validation-provider
              #default="{ errors }"
              name="Password"
              rules="required"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="login-password"
                  v-model="password"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="login-password"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- submit buttons -->
          <b-button
            type="submit"
            variant="danger"
            block
            @click="validationForm"
          >
            Masuk
          </b-button>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>Belum punya akun? </span>
        <b-link :to="{ name: 'register' }">
          <span>&nbsp;Daftar disini</span>
        </b-link>
      </b-card-text>
    </div>
  </div>
  <div v-else-if="orang_status.data.orang_status === false" class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <br />
      <center>
        <img :src="iconCheckStatusAccount" alt="icon-verify" width="150px" />
      </center>
      <br />
      <br />
      <b-col
        v-for="(data, index) in colorVerifyStatusAccount"
        :key="index"
        md="6"
        xl="4"
      >
        <b-card :bg-variant="data.bg" text-variant="white">
          <b-card-title class="text-white"> Halo {{ userEmail }} </b-card-title>
          <b-card-text>
            <p>Gagal Login</p>
            <p>
              {{ orang_status.data.message }} dan silahkan hubungi kontak untuk
              mempercepat proses pengaktifan akun
            </p>
            <p>
              Contact:
              <a :href="contactHandler" target="_blank">{{ "08119110189" }}</a>
            </p>
          </b-card-text>
          <b-button
            type="submit"
            variant="outline-warning"
            block
            @click="reloadPage"
          >
            Back To Home
          </b-button>
        </b-card>
      </b-col>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";

import {
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardText,
  BCardTitle,
  BForm,
  BButton,
  BCard,
  BImg,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import apis from "@/api";
import { setUserStorage } from "@/helpers/getDataFromStorage";

export default {
  components: {
    BLink,
    BFormGroup,
    BaseNavigation,
    DividerNavigation,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BCardTitle,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BCard,
    BImg,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      colorVerifyStatusAccount: [{ bg: "danger", title: "Danger card title" }],
      simfoniLogo: require("@/assets/images/logo/simfoni.png"),
      logoSimfoniNew: require("@/assets/images/logo/logo-new-idi.png"),
      status: "",
      // password: 'Home123456',
      // userEmail: 'dzakkiaz7@gmail.com',
      passwordFieldType: "password",
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      required,
      email,
      orang_status: {
        data: null,
      },
    };
  },
  mounted() {
    this.login();
  },
  computed: {
    contactHandler() {
      return "whatsapp://send/?phone=08119110189&text=IDI-Jakpus";
    },
    iconCheckStatusAccount() {
      return require("@/assets/images/icons/user-blocked.png");
    },
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
    reloadPage() {
      window.location.reload();
    },
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.login();
        }
      });
    },
    login() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.authv2
        .login({
          email: this.userEmail,
          password: this.password,
        })
        .then((res) => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Login berhasil",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          const { token, user } = res.data;
          setUserStorage({
            tokenCurrent: token,
            userId: user.id,
            userLevel: user.orang_level,
            email: user.orang_email,
          });
          this.$router.push({ path: "/", replace: true });
        })
        .catch((error) => {
          if (error.response.data.orang_status === true) {
            this.errorHandler(error, "Login gagal, silahkan coba lagi nanti");
            this.orang_status.data = error.response.data;
          } else {
            this.orang_status.data = error.response.data;
            console.log(error.response.data);
          }
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

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
a:link {
  color: #ffff;
}
</style>
