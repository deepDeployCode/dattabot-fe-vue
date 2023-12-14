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
      <validation-observer ref="loginValidation">
        <b-form class="auth-login-form" @submit.prevent>
          <b-form-group label="Name" label-for="login-email">
            <validation-provider
              #default="{ errors }"
              name="Name"
              rules="required"
            >
              <b-form-input
                id="login-name"
                v-model="name"
                :state="errors.length > 0 ? false : null"
                name="login-name"
                placeholder="john@example.com"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Username" label-for="login-email">
            <validation-provider
              #default="{ errors }"
              name="Username"
              rules="required"
            >
              <b-form-input
                id="login-username"
                v-model="username"
                :state="errors.length > 0 ? false : null"
                name="login-username"
                placeholder="john@example.com"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Email" label-for="login-email">
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="login-email"
                v-model="email"
                :state="errors.length > 0 ? false : null"
                name="login-email"
                placeholder="john@example.com"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
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
                  id="register-password"
                  v-model="password"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="password"
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

          <b-form-group
            label="Password Confirmation"
            label-for="password-confirmation"
          >
            <validation-provider
              #default="{ errors }"
              name="Password Confirmation"
              rules="required|password:@password"
            >
              <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid' : null"
              >
                <b-form-input
                  id="register-password-confirmation"
                  v-model="password_confirmation"
                  :state="errors.length > 0 ? false : null"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="password-confirmation"
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
            variant="outline-danger"
            block
            @click="validationForm"
          >
            Submit
          </b-button>
        </b-form>
      </validation-observer>

      <!-- <b-card-text class="text-center mt-2">
        <span>Sudah ingat password atau ingin login? </span>
        <b-link :to="{ name: 'login' }">
          <span>&nbsp;Login disini</span>
        </b-link>
      </b-card-text> -->
    </div>
    <hr />
    <div class="p-2 mx-auto">
      <div class="d-flex align-self-center">
        <feather-icon icon="InfoIcon" size="20" stroke-width="2" class="mr-1" />
        <h4>Information</h4>
      </div>
      <div>
        <ol class="pl-2 mt-1">
          <li>if you have register account then could be login on the apps.</li>
          <li>and if have login on apps then you can manage own your task</li>
        </ol>
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
  BFormInput,
  BCardText,
  BForm,
  BInputGroup,
  BInputGroupAppend,
  BButton,
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
    extend,
    BFormGroup,
    BFormInput,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BaseNavigation,
    DividerNavigation,
    BImg,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      simfoniLogo: require("@/assets/images/logo/dattabot.png"),
      userEmail: null,
      required,
      email,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.register();
        }
      });
    },
    register() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.authv2
        .register({
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: "Register Success Please Login.",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.$router.push({ path: "/login", replace: true });
        })
        .catch((error) => {
          this.errorHandler(error, "Failed Register, please register again");
          console.log(error.response.data);
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
