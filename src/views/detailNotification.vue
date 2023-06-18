<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <p>Title : {{ this.notifikasi.detail.notif_title }}</p>
      <p>Message : {{ this.notifikasi.detail.notif_msg }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import {
  BButton,
  BCard,
  BImg,
  BSpinner,
  BForm,
  BFormGroup,
  BFormFile,
  // BBadge,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
// import { required, email } from '@validations'
import apis from "@/api";
import storage from "@/helpers/storage";
import { required } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    BCard,
    BImg,
    BSpinner,
    BForm,
    BFormGroup,
    BFormFile,
    ValidationProvider,
    ValidationObserver,
    // BBadge,
  },
  data() {
    return {
      required,
      examplePicStudiKasus: require("@/assets/images/pages/Studi_Kasus_Contoh.jpeg"),
      notifikasi: {
        detail: null,
        isLoading: false,
      },
      tempFileBerkas: null,
      fileBerkas: null,
      toggleUploadBerkas: false,
    };
  },
  computed: {
    // https://www.idijakpus.or.id/uploads/krip/krip_file/1473/A2.png
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchDetailNotifikasi();
  },
  methods: {
    fetchDetailNotifikasi() {
      this.notifikasi.isLoading = true;
      apis.profile
        .notificationDetail(this.$route.params.id_notification)
        .then(({ data }) => {
          this.notifikasi.detail = data.data;
        })
        .finally(() => {
          this.notifikasi.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
