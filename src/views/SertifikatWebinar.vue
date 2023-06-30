<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div style="width: 100%" class="pl-25"></div>
      <br />
      <div>
        <b-card class="shadow-none border mb-1" no-body>
          <div class="d-flex p-1 border-bottom">
            <div>
              <div class="font-weight-bold">
                #WEBINAR-{{ sertifikat.data.webinar_id }}
              </div>
            </div>
          </div>
          <div class="p-1">
            <table>
              <tbody>
                <tr>
                  <td>Tanggal</td>
                  <td class="font-weight-bold">
                    : {{ sertifikat.data.created_at }}
                  </td>
                </tr>
                <tr>
                  <td>Sertifikat</td>
                  <td class="font-weight-bold">
                    :
                    <a :href="getSERTIFIKAT(sertifikat.data)" target="_blank"
                      >Unduh</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>

        <div
          v-if="sertifikat.isLoading"
          class="d-flex justify-content-center mb-1">
          <b-spinner label="Loading..." variant="danger" />
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
      sertifikat: {
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
    getSERTIFIKAT() {
      return (item) => {
        if (item.webinar_file) {
          if (!item.webinar_file.includes("https")) {
            return `https://www.idijakpus.or.id/uploads/krip/webinar_file/${item.id}/${item.webinar_file}`;
          }
          return item.webinar_file;
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
    this.fetchSertifikat();
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
        if (!this.sertifikat.isLoading && this.sertifikat.nextPageUrl) {
          this.fetchSertifikat(this.sertifikat.nextPageUrl);
        }
      }
    },
    fetchSertifikat() {
      this.sertifikat.isLoading = true;
      apis.webinar
        .sertifikatWebinar(this.$route.params.id_sertifikat)
        .then(({ data }) => {
          this.sertifikat.data = data.data;
        })
        .finally(() => {
          this.sertifikat.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
