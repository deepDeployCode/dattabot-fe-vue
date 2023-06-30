<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div style="width: 100%" class="pl-25"></div>
      <br />
      <div>
        <b-card
          v-for="item in webinar.data"
          :key="item.id"
          class="shadow-none border mb-1"
          no-body>
          <div class="d-flex p-1 border-bottom">
            <div>
              <div class="font-weight-bold">
                #WEBINAR-{{ item.webijadwal_id.id }}
              </div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div class="ml-auto pointer">
              <b-button
                size="sm"
                class="bg-primary bg-lighten-1"
                @click="batalkanWebinar(item.webijadwal_id.id)">
                Cancel
              </b-button>
              <b-button
                size="sm"
                class="bg-warning bg-lighten-1"
                target="_blank"
                @click="sertifikatWebinar(item.webijadwal_id.id)">
                Sertifikat
              </b-button>
            </div>
          </div>
          <div class="p-1">
            <table>
              <tbody>
                <tr>
                  <td>Judul</td>
                  <td class="font-weight-bold">
                    : {{ item.webijadwal_id.webijadwal_title }}
                  </td>
                </tr>
                <tr>
                  <td>Urutan</td>
                  <td class="font-weight-bold">: {{ item.id }}</td>
                </tr>
                <tr>
                  <td>Tanggal</td>
                  <td class="font-weight-bold">: {{ item.created_at }}</td>
                </tr>
                <tr>
                  <td>Name Users</td>
                  <td class="font-weight-bold">
                    : {{ item.orang_id.orang_nama_lengkap }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card>

        <div
          v-if="webinar.isLoading"
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
      webinar: {
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
    getWebinarImg() {
      return (item) => {
        if (item.webijadwal_img) {
          return item.webijadwal_img;
        }
        return require("@/assets/images/logo/no_available.jpg");
      };
    },
    checkStatusWebinar() {
      return (item) => {
        if (item.id) {
          apis.webinar.checkWebinarStatus(item.id).then(({ data }) => {
            return data.data;
          });
        } else {
          return false;
        }
      };
    },
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchWebinarRegistered();
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
        if (!this.webinar.isLoading && this.webinar.nextPageUrl) {
          this.fetchWebinarRegistered(this.webinar.nextPageUrl);
        }
      }
    },
    fetchWebinarRegistered(url) {
      this.webinar.isLoading = true;
      apis.webinar
        .listRegisterWebinar(url)
        .then(({ data }) => {
          if (url) {
            this.webinar.data = this.webinar.data.concat(data.data);
          } else {
            this.webinar.data = data.data;
          }
          this.webinar.nextPageUrl = data.next_page_url;
        })
        .finally(() => {
          this.webinar.isLoading = false;
        });
    },

    batalkanWebinar(id) {
      this.$swal({
        title: "Apakah kamu yakin?",
        text: "Setelah membatalkan webinar, anda tetap bisa mendaftar kembali",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, Batalkan!",
        cancelButtonText: "Tutup",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      })
        .then((result) => {
          if (result.value) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
            return apis.webinar.cancelWebinar(id);
          }
          return false;
        })
        .then((result) => {
          if (result) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
            this.fetchWebinarRegistered();
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: "Berhasil membatalkan pendaftaran webinar",
                icon: "CheckIcon",
                variant: "success",
              },
            });
          }
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal membatalkan pendaftaran webinar, silahkan coba lagi nanti"
          );
        });
    },

    sertifikatWebinar(id) {
      this.webinar.isLoading = true;
      apis.webinar
        .sertifikatWebinar(id)
        .then(({ data }) => {
          return this.$router.push(
            `/sertifikat/${data.data.webinar_id}/webinar`
          );
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal membatalkan pendaftaran webinar, silahkan coba lagi nanti"
          );
        })
        .finally(() => {
          this.webinar.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
