<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div>
        <b-card
          v-for="item in notifikasi.data"
          :key="item.id"
          class="shadow-none border mb-1"
          no-body>
          <div
            class="d-flex p-1 border-bottom"
            :class="item.notif_read === false ? 'bg-warning text-white' : ''">
            <div>
              <div class="font-weight-bold">#NOTIFIKASI-{{ item.id }}</div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div class="ml-auto pointer">
              <b-button
                size="sm"
                class="bg-primary bg-lighten-1"
                @click="$router.push(`/notifikasi/${item.id}`)">
                Show
              </b-button>
            </div>
          </div>
          <div class="p-1">
            <table>
              <tbody>
                <tr>
                  <td>Tanggal</td>
                  <td class="font-weight-bold">: {{ item.created_at }}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td class="font-weight-bold">: {{ item.notif_title }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td class="font-weight-bold">: {{ item.notif_read }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>

        <div
          v-if="notifikasi.isLoading"
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
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchNotifikasi();
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
        if (!this.notifikasi.isLoading && this.notifikasi.nextPageUrl) {
          this.fetchNotifikasi(this.notifikasi.nextPageUrl);
        }
      }
    },
    fetchNotifikasi(url) {
      this.notifikasi.isLoading = true;
      apis.profile
        .notification(url)
        .then(({ data }) => {
          if (url) {
            this.notifikasi.data = this.notifikasi.data.concat(data.data);
          } else {
            this.notifikasi.data = data.data;
          }
          this.notifikasi.nextPageUrl = data.next_page_url;
        })
        .finally(() => {
          this.notifikasi.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
