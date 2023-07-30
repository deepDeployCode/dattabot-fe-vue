<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="font-weight-bold mb-1" style="font-size: 16px">Webinar</div>
      <div class="p-2 mx-auto">
        <div>
          <b-card
            v-for="item in schedule.data"
            :key="item.id"
            class="shadow-none border mb-1 pointer mr-1 webinar-card p-2 mx-auto"
            :img-src="item.webijadwal_img"
            @click="$router.push(`/webinar/${item.id}/detail`)"
            no-body
            ><div
              class="mb-25 font-weight-bold"
              @click="$router.push(`/webinar/${item.id}/detail`)">
              {{ item.webijadwal_title }}
            </div>
            <div class="font-weight-light" style="font-size: 12px">
              {{ item.created_at }}
            </div>
          </b-card>

          <div
            v-if="schedule.isLoading"
            class="d-flex justify-content-center mb-1">
            <b-spinner label="Loading..." variant="danger" />
          </div>
        </div>
      </div>
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
      schedule: {
        data: null,
        isLoading: false,
        nextPageUrl: null,
      },
      tempFileBerkas: null,
      fileBerkas: null,
      toggleUploadBerkas: false,
    };
  },
  computed: {
    // https://www.idijakpus.or.id/uploads/krip/krip_file/1473/A2.png
    getKRPFile() {
      return (item) => {
        if (item.krip_file) {
          if (!item.krip_file.includes("https")) {
            return `https://www.idijakpus.or.id/uploads/krip/krip_file/${item.id}/${item.krip_file}`;
          }
          return item.krip_file;
        }
        return null;
      };
    },
    isPDF() {
      return (item) => {
        if (item.krip_file?.includes(".pdf")) {
          return true;
        }
        return false;
      };
    },
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchwebinar();
  },
  methods: {
    viewPdf(url) {
      storage.setStorage("pdfUrl", url);
      this.$router.push({ path: "/pdfview" });
    },
    scrollCallback() {
      const element = document.getElementsByClassName("app-wrapper")[0];
      const { scrollTop } = element;
      const { scrollHeight } = element;
      const { clientHeight } = element;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        if (!this.schedule.isLoading && this.schedule.nextPageUrl) {
          this.fetchwebinar(this.schedule.nextPageUrl);
        }
      }
    },
    fetchwebinar() {
      this.schedule.isLoading = true;
      apis.webinar.listWebinarEvent().then(({ data }) => {
        this.schedule.data = data.data;
        this.schedule.isLoading = false;
      });
    },
  },
};
</script>

<style></style>
