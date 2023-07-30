<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <br />
      <div>
        <b-card class="shadow-none border mb-1" no-body>
          <div
            class="d-flex p-1 border-bottom"
            :class="
              webinarDetails.data.webijadwal_status !== 'pendaftaran-dibuka'
                ? 'bg-warning text-white'
                : ''
            ">
            <div>
              <div class="font-weight-bold">
                #WEBINAR-{{ webinarDetails.data.id }}
              </div>
              <b-badge
                v-if="
                  webinarDetails.data.webijadwal_status !== 'pendaftaran-dibuka'
                "
                variant="light-danger font-weight–light mt-25">
                Pendaftaran Sudah Ditutup
              </b-badge>
            </div>
            <div class="ml-auto pointer">
              <b-button
                v-if="
                  webinarDetails.data.webijadwal_status === 'pendaftaran-dibuka'
                "
                size="sm"
                class="bg-primary bg-lighten-1"
                @click="daftarWebinar(webinarDetails.data.id)">
                Daftar
              </b-button>
            </div>
          </div>
          <div class="pb-1 pt-1">
            <b-img
              :src="getWebinarImg(webinarDetails.data)"
              fluid
              class="mb-25"
              width="340"
              height="300"
              center />
          </div>
          <div class="p-1">
            <table>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td class="font-weight-bold">
                    : {{ webinarDetails.data.webijadwal_title }}
                  </td>
                </tr>
                <tr>
                  <td>Tanggal</td>
                  <td class="font-weight-bold">
                    : {{ webinarDetails.data.webijadwal_tanggal }}
                  </td>
                </tr>
                <tr>
                  <td>Jam</td>
                  <td class="font-weight-bold">
                    : {{ webinarDetails.data.webijadwal_jam }}
                  </td>
                </tr>
                <tr>
                  <td>Limit / Durasi</td>
                  <td class="font-weight-bold">
                    : {{ webinarDetails.data.webijadwal_durasi }}/
                    {{ webinarDetails.data.webijadwal_limit }} Menit
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td class="font-weight-bold">
                    : {{ webinarDetails.data.webijadwal_status }}
                  </td>
                </tr>
                <template
                  v-if="
                    webinarDetails.data.webijadwal_link &&
                    webinarDetails.data.webijadwal_status ===
                      'pendaftaran-dibuka'
                  ">
                  <!-- hide aja kan linknya jg dapet via email-->
                  <!-- <tr>
                    <td><b>Link</b></td>
                    <td class="font-weight-bold">
                      :
                      <a
                        :href="webinarDetails.data.webijadwal_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Buka
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Zoom ID</b></td>
                    <td class="font-weight-bold">
                      : {{ webinarDetails.data.webijadwal_zoom_id }}
                    </td>
                  </tr>
                  <tr>
                    <td><b>Password</b></td>
                    <td class="font-weight-bold">
                      : {{ webinarDetails.data.webijadwal_password }}
                    </td>
                  </tr> -->
                </template>
              </tbody>
            </table>
          </div>
        </b-card>

        <div
          v-if="webinarDetails.isLoading"
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
      webinarDetails: {
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
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchDetailWebinar();
  },
  methods: {
    fetchDetailWebinar() {
      this.webinarDetails.isLoading = true;
      apis.webinar
        .detailsWebinar(this.$route.params.id_webinar)
        .then(({ data }) => {
          this.webinarDetails.data = data.data;
        })
        .finally(() => {
          this.webinarDetails.isLoading = false;
        });
    },
    daftarWebinar(id) {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.webinar
        .registerWebinar({
          webijadwal_id: id,
        })
        .then(() => {
          this.fetchDetailWebinar();
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Berhasil mendaftar webinar!",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.toggleUploadBerkas = false;
          this.fetchDetailWebinar();
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal daftar webinar, silahkan coba lagi nanti"
          );
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
  },
};
</script>

<style></style>
