<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <br />
      <center><img :src="iconVerify" alt="icon-verify" width="150px" /></center>
      <br />
      <br />
      <b-col
        v-for="(data, index) in colorVerifyStatusAccount"
        :key="index"
        md="6"
        xl="4"
      >
        <b-card :bg-variant="data.bg" text-variant="white">
          <b-card-title class="text-white">
            Halo {{ "Abdul Majid" }}
          </b-card-title>
          <b-card-text>
            <p>Berhasil Registrasi</p>
            <p>
              Sudah register dan akan di verifikasi oleh tim IDI Jakpus dan
              silahkan hubungi kontak
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
            @click="$router.push('/login')"
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

import {
  BButton,
  BCard,
  BForm,
  BFormInput,
  BFormSelect,
  BFormFile,
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
  BFormDatepicker,
  BFormTimepicker,
  VBModal,
  BCardText,
  BCardTitle,
  BImg,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

import { required } from "@validations";

import apis from "@/api";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormInput,
    BFormSelect,
    BFormFile,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
    BModal,
    BCard,
    BCardText,
    BCardTitle,
    BFormDatepicker,
    BFormTimepicker,
    BImg,
    AppCollapseItem,
    AppCollapse,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      colorVerifyStatusAccount: [{ bg: "danger", title: "Danger card title" }],
      verify: {
        isLoading: null,
        data: null,
      },
    };
  },
  computed: {
    contactHandler() {
      return "whatsapp://send/?phone=08119110189&text=IDI-Jakpus";
    },
    iconVerify() {
      return require("@/assets/images/icons/iconVerify2.png");
    },
  },
  watch: {
    reg: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<style>
a:link {
  color: #ffff;
}
</style>
