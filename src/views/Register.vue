<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <!-- form -->
      <validation-observer ref="loginValidation">
        <b-form
          class="auth-login-form mt-2"
          @submit.prevent
        >

          <b-form-group
            label="Opsi Pendaftaran"
            label-for="opsi-pendaftaran"
          >
            <validation-provider
              #default="{ errors }"
              name="Opsi Pendaftaran *"
              rules="required"
            >
              <b-form-select
                v-model="selectedRegistration"
                :state="errors.length > 0 ? false:null"
                :options="optionRegistration"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <AnggotaIDI />

          <!-- submit buttons -->
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validationForm"
          >
            Daftar
          </b-button>
        </b-form>
      </validation-observer>

      <b-card-text class="text-center mt-2">
        <span>Sudah punya akun? </span>
        <b-link :to="{name:'login'}">
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
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BCardText,
  BForm,
  BButton,
  BFormSelect,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import AnggotaIDI from '@/components/RegisterComponents/AnggotaIDI.vue'


export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardText,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BFormSelect,
    BaseNavigation,
    DividerNavigation,
    AnggotaIDI,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: 'home258',
      userEmail: 'forumkita.idijakpus@gmail.com',
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
      selectedRegistration: null,
      optionRegistration: [
        {
          value: null,
          text: 'Silahkan pilih opsi pendaftaran',
        },
        {
          value: 'anggota',
          text: 'Anggota IDI Jakarta Pusat',
        },
        {
          value: 'belum-menjadi-aggota',
          text: 'Belum menjadi anggota IDI',
        },
        {
          value: 'non-anggota-idi-jakpus',
          text: 'Anggota Non IDI Jakarta Pusat',
        },
      ],
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
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Login berhasil',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
