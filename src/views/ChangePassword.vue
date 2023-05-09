<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div v-if="fetchChangePasswords.data.message" class="p-2 mx-auto">
      <b-col
        v-for="(data, index) in colorResetPassword"
        :key="index"
        md="6"
        xl="4">
        <b-card :bg-variant="data.bg" text-variant="white">
          <b-card-title class="text-white">
            {{ "Forgot Passwords" }}
          </b-card-title>
          <b-card-text>
            <p>
              {{ fetchChangePasswords.data.message }}
            </p>
          </b-card-text>
        </b-card>
      </b-col>
      <b-button
        type="submit"
        variant="outline-danger"
        block
        @click="$router.push(`/login`)">
        Login
      </b-button>
    </div>
    <div v-else class="p-2 mx-auto">
      <div class="d-flex justify-content-center mb-2">
        <b-img
          fluid
          width="150"
          height="150"
          :src="simfoniLogo"
          alt="simfoniLogo" />
      </div>
      <!-- form -->
      <validation-observer ref="loginValidation">
        <b-form class="auth-login-form" @submit.prevent>
          <b-form-group label="Email" label-for="login-email">
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email">
              <b-form-input
                id="login-email"
                v-model="fetchChangePasswords.data.email"
                :state="errors.length > 0 ? false : null"
                name="login-email"
                placeholder="john@example.com" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- forgot password -->
          <b-form-group>
            <label for="change-new-password">Password baru</label>
            <validation-provider
              #default="{ errors }"
              name="Password baru"
              rules="required">
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null">
                <b-form-input
                  id="change-new-password"
                  v-model="password"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="change-new-password"
                  placeholder="············" />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility" />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group>
            <label for="change-confirm-new-password"
              >Konfirmasi Password baru</label
            >
            <validation-provider
              #default="{ errors }"
              name="Konfirmasi Password baru"
              rules="required">
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null">
                <b-form-input
                  id="change-confirm-new-password"
                  v-model="confirmPassword"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="change-confirm-new-password"
                  placeholder="············" />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility" />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- submit buttons -->
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validationForm">
            Submit
          </b-button>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>Tidak jadi Reset password? </span>
        <b-link :to="{ name: 'login' }">
          <span>&nbsp;Silahkan Login disini</span>
        </b-link>
      </b-card-text>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  BLink,
  BFormGroup,
  BFormInput,
  BCardText,
  BCardTitle,
  BCard,
  BForm,
  BButton,
  BInputGroupAppend,
  BInputGroup,
  BImg,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import apis from "@/api";

export default {
  components: {
    BLink,
    BFormGroup,
    BFormInput,
    BCard,
    BCardText,
    BCardTitle,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BaseNavigation,
    DividerNavigation,
    BInputGroupAppend,
    BInputGroup,
    BImg,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      colorResetPassword: [{ bg: "danger", title: "Danger card title" }],
      simfoniLogo: require("@/assets/images/logo/logo-new-idi.png"),
      password: "",
      confirmPassword: "",
      passwordFieldType: "password",
      required,
      email,
      fetchChangePasswords: {
        isLoading: null,
        data: null,
      },
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  mounted() {},
  created() {
    this.getChangePasswords();
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.resetPassword();
        }
      });
    },
    getChangePasswords() {
      this.fetchChangePasswords.isLoading = true;
      apis.auth
        .getChangePassword(this.$route.params.token)
        .then(({ data }) => {
          this.fetchChangePasswords.data = data;
        })
        .catch((error) => {
          this.fetchChangePasswords.data = error;
        })
        .finally(() => {
          this.fetchChangePasswords.isLoading = false;
        });
    },
    resetPassword() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.auth
        .resetPassword({
          email: this.fetchChangePasswords.data.email,
          password: this.password,
          password_confirmation: this.confirmPassword,
          token: this.$route.params.token,
        })
        .then(() => {
          this.$router.push({ path: "/login", replace: true });
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "berhasil mengganti password, silahkan login kembali.",
              icon: "CheckIcon",
              variant: "success",
            },
          });
        })
        .catch((error) => {
          this.errorHandler(error, "Gagal mengganti password");
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
