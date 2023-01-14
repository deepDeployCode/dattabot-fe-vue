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
        <b-form
          class="auth-login-form"
          @submit.prevent
        >

          <b-form-group
            label="Email"
            label-for="login-email"
          >
            <validation-provider
              #default="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-form-input
                id="login-email"
                v-model="userEmail"
                :state="errors.length > 0 ? false:null"
                name="login-email"
                placeholder="john@example.com"
              />
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

      <b-card-text class="text-center mt-2">
        <span>Sudah ingat password atau ingin login? </span>
        <b-link :to="{name:'login'}">
          <span>&nbsp;Login disini</span>
        </b-link>
      </b-card-text>
    </div>
    <hr>
    <div class="p-2 mx-auto">
      <div class="d-flex align-self-center">
        <feather-icon
          icon="InfoIcon"
          size="20"
          stroke-width="2"
          class="mr-1"
        />
        <h4>
          Instruksi lanjutan
        </h4>
      </div>
      <div>
        <ol class="pl-2 mt-1">
          <li>Setelah menekan tombol submit, aplikasi akan memeriksa akun Anda.</li>
          <li>Jika Akun Anda ditemukan, aplikasi akan mengirimkan sebuah link untuk pergantian password</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BLink,
  BFormGroup,
  BFormInput,
  BCardText,
  BForm,
  BButton,
  BImg,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import apis from '@/api'

export default {
  components: {
    BLink,
    BFormGroup,
    BFormInput,
    BCardText,
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
      simfoniLogo: require('@/assets/images/logo/simfoni.png'),
      userEmail: 'dzakkiaz7@gmail.com',
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.forgotPassword()
        }
      })
    },
    forgotPassword() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      apis.auth.forgotPassword({
        email: this.userEmail,
      })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Link reset berhasil dikirim melalui email, silahkan check email anda.',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        })
        .catch(error => {
          this.errorHandler(error, 'Gagal melakukan lupa password')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
