<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div>
        <b-card
          v-for="item in schedule.data"
          :key="item.id"
          class="shadow-none border mb-1"
          no-body
        >
          <div
            class="d-flex p-1 border-bottom"
            :class="item.is_regis ? 'bg-warning text-white' : ''"
          >
            <div>
              <div class="font-weight-bold">#Archive-{{ item._id }}</div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div class="ml-auto pointer">
              <b-button
                size="sm"
                class="bg-primary bg-lighten-1"
                @click="restoreTask(item._id, item.title, item.description)"
              >
                Restore
              </b-button>
            </div>
          </div>
          <div class="p-1">
            <table>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td class="font-weight-bold">: {{ item.title }}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td class="font-weight-bold">: {{ item.description }}</td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td class="font-weight-bold">: {{ item.due_date }}</td>
                </tr>
                <tr>
                  <td>Priority</td>
                  <td class="font-weight-bold">: {{ item.task_priority }}</td>
                </tr>
                <tr>
                  <td>user</td>
                  <td class="font-weight-bold">: {{ item.user.name }}</td>
                </tr>
                <!-- <template
                  v-if="
                    item.kripjadwal_link &&
                    item.kripjadwal_status === 'pendaftaran-dibuka' &&
                    item.is_regis
                  "
                >
                  <tr>
                    <td><b>Link</b></td>
                    <td class="font-weight-bold">
                      :
                      <a
                        :href="item.kripjadwal_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Buka
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td><b>Zoom ID</b></td>
                    <td class="font-weight-bold">
                      : {{ item.kripjadwal_zoom_id }}
                    </td>
                  </tr>
                  <tr>
                    <td><b>Password</b></td>
                    <td class="font-weight-bold">
                      : {{ item.kripjadwal_pass }}
                    </td>
                  </tr>
                </template> -->
              </tbody>
            </table>
          </div>
        </b-card>

        <div
          v-if="schedule.isLoading"
          class="d-flex justify-content-center mb-1"
        >
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
    this.fetchSchedule();
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
          this.fetchSchedule(this.schedule.nextPageUrl);
        }
      }
    },
    fetchSchedule(url) {
      this.schedule.isLoading = true;
      apis.krip
        .getSchedule(url)
        .then(({ data }) => {
          if (url) {
            this.schedule.data = this.schedule.data.concat(data.data);
          } else {
            this.schedule.data = data.data;
          }
          this.schedule.nextPageUrl = data.next_page_url;
        })
        .finally(() => {
          this.schedule.isLoading = false;
        });
    },
    restoreTask(id, title, description) {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.krip
        .daftar({
          id: id,
          title: title,
          description: description,
          archived: "restore",
        })
        .then(() => {
          this.fetchSchedule();
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Successfully Restore Task!",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.toggleUploadBerkas = false;
          this.fetchKrips();
        })
        .catch((error) => {
          this.errorHandler(error, "Failed Task, try again");
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
    batalkanKrip(id) {
      this.$swal({
        title: "Apakah kamu yakin?",
        text: "Setelah membatalkan, anda tetap bisa mendaftar kembali",
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
            return apis.krip.batal(id);
          }
          return false;
        })
        .then((result) => {
          if (result) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
            this.fetchSchedule();
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: "Berhasil membatalkan pendaftaran",
                icon: "CheckIcon",
                variant: "success",
              },
            });
          }
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal membatalkan pendaftaran, silahkan coba lagi nanti"
          );
        });
    },
  },
};
</script>

<style></style>
