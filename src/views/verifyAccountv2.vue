<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <b-col
        v-for="(data, index) in colorVerifyStatusAccount"
        :key="index"
        md="6"
        xl="4"
      >
        <b-card :bg-variant="data.bg" text-variant="white">
          <b-card-title v-if="verify.data != null" class="text-white">
            Status Akun Anda
          </b-card-title>
          <b-card-text>
            <p>{{ verify.data.message }}</p>
            <p>
              {{ "dengan cara mengklik tombol di bawah ini" }}
            </p>
            <b-button
              v-if="verify.data.status === true"
              type="submit"
              variant="outline-danger"
              block
              @click="$router.push(`/login`)"
            >
              Login
            </b-button>
          </b-card-text>
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
  computed: {},
  watch: {
    reg: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() {},
  created() {
    this.fetchVerifyStatusAccount();
  },
  methods: {
    fetchVerifyStatusAccount() {
      this.verify.isLoading = true;
      apis.authv2
        .verifyAccount(this.$route.params.npa)
        .then(({ data }) => {
          this.verify.data = data;
        })
        .catch((error) => {
          this.verify.data = error;
        })
        .finally(() => {
          this.verify.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
