<template>
  <div class="app-wrapper">
    <div class="login-wrapper p-2">

      <div class="d-flex justify-content-center mb-3">
        <b-img fluid width="100" height="100" :src="logoSimfoniNew" alt="logoSimfoniNew" />
      </div>
      <br>
      <div class="d-flex justify-content-center">
        <p><b>
            <h1>Selamat datang!</h1>
          </b>
          <br>
          Silahkan login untuk menggunakan aplikasi layanan terintegrasi <b>IDI Cabang Jakarta Pusat</b>
        </p>
      </div>
      <!-- form -->
      <validation-observer ref="loginValidation">
        <b-form class="auth-login-form mt-2" @submit.prevent>
          <!-- email -->
          <b-form-group label="Email" label-for="login-email">
            <validation-provider #default="{ errors }" name="Email" rules="required|email">
              <b-form-input id="login-email" v-model="userEmail" :state="errors.length > 0 ? false : null"
                name="login-email" placeholder="john@example.com" />
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
            <validation-provider #default="{ errors }" name="Password" rules="required">
              <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                <b-form-input id="login-password" v-model="password" :state="errors.length > 0 ? false : null"
                  class="form-control-merge" :type="passwordFieldType" name="login-password" placeholder="············" />
                <b-input-group-append is-text>
                  <feather-icon class="cursor-pointer" :icon="passwordToggleIcon" @click="togglePasswordVisibility" />
                </b-input-group-append>
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <!-- submit buttons -->
          <b-button type="submit" variant="danger" block @click="validationForm">
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
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
  BImg,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import apis from '@/api'
import { setUserStorage } from '@/helpers/getDataFromStorage'

export default {
  components: {
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BCardTitle,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BImg,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      simfoniLogo: require('@/assets/images/logo/simfoni.png'),
      logoSimfoniNew: require('@/assets/images/logo/logo-new-idi.png'),
      status: '',
      // password: 'Home123456',
      // userEmail: 'dzakkiaz7@gmail.com',
      passwordFieldType: 'password',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then(success => {
        if (success) {
          this.login()
        }
      })
    },
    login() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      apis.auth.login({
        email: this.userEmail,
        password: this.password,
      })
        .then(res => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Login berhasil',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          const { token, user } = res.data
          setUserStorage({
            tokenCurrent: token,
            userId: user.id,
            userLevel: user.orang_level,
            email: user.orang_email,
          })
          this.$router.push({ path: '/', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'Login gagal, silahkan coba lagi nanti')
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

.login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
