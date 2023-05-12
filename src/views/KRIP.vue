<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex flex-row">
        <div style="width: 50%" class="pr-25">
          <b-button
            :variant="`${!toggleUploadBerkas ? 'outline-' : ''}danger`"
            block
            @click="toggleUploadBerkas = !toggleUploadBerkas">
            {{ toggleUploadBerkas ? "Batalkan " : "Upload Berkas" }}
          </b-button>
        </div>
        <div style="width: 50%" class="pl-25">
          <b-button
            variant="outline-danger"
            block
            @click="$router.push('/krip/jadwal')">
            Lihat Jadwal
          </b-button>
        </div>
      </div>

      <b-form v-if="toggleUploadBerkas" class="mt-1" @submit.prevent>
        <validation-observer ref="formKRIP">
          <b-form-group label="Berkas" label-for="berkas">
            <validation-provider
              #default="{ errors }"
              name="berkas"
              rules="required">
              <b-form-file
                id="berkas"
                v-model="tempFileBerkas"
                :state="errors.length > 0 ? false : null"
                name="file"
                @change="onChangeFileBerkas($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-img
              v-if="fileBerkas"
              fluid
              center
              :src="fileBerkas"
              alt="fileBerkas"
              class="mt-1"
              style="max-height: 250px" />
          </b-form-group>
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validationForm">
            Simpan
          </b-button>
        </validation-observer>
        <hr />
      </b-form>
      <div class="mt-1">
        <b-card
          v-for="item in krip.data"
          :key="item.id"
          class="shadow-none border p-1 mb-1"
          no-body>
          <div class="d-flex pb-1 border-bottom">
            <div>
              <div class="font-weight-bold">#KRIP-BERKAS-{{ item.id }}</div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div
              class="ml-auto pointer text-danger"
              @click="hapusBerkas(item.id)">
              <feather-icon icon="TrashIcon" size="16" class="align-middle" />
            </div>
          </div>
          <div class="pb-1 pt-1">
            <b-img
              v-if="!isPDF(item)"
              :src="getKRPFile(item)"
              fluid
              class="mb-25" />
            <div
              v-else
              class="text-primary text-underline pointer"
              @click="viewPdf(getKRPFile(item))">
              <u>Lihat berkas</u>
            </div>
          </div>
        </b-card>

        <div v-if="krip.isLoading" class="d-flex justify-content-center mb-1">
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
      krip: {
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
    this.fetchKrips();
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
        if (!this.krip.isLoading && this.krip.nextPageUrl) {
          this.fetchKrips(this.krip.nextPageUrl);
        }
      }
    },
    fetchKrips(url) {
      this.krip.isLoading = true;
      apis.krip
        .getKrip(url)
        .then(({ data }) => {
          if (url) {
            this.krip.data = this.krip.data.concat(data.data);
          } else {
            this.krip.data = data.data;
          }
          this.krip.nextPageUrl = data.next_page_url;
        })
        .finally(() => {
          this.krip.isLoading = false;
        });
    },
    validationForm() {
      this.$refs.formKRIP.validate().then((success) => {
        if (success) {
          this.simpanBerkas();
        }
      });
    },
    simpanBerkas() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.krip
        .upload({
          file: this.fileBerkas,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Berhasil upload berkas",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.toggleUploadBerkas = false;
          this.fetchKrips();
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal upload berkas, silahkan coba lagi nanti"
          );
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
    onChangeFileBerkas(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.fileBerkas = result;
        });
      }
    },
    createImage(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    hapusBerkas(id) {
      this.$swal({
        title: "Apakah kamu yakin?",
        text: "Berkas yang sudah dihapus, tidak bisa dikembalikan",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
        customClass: {
          confirmButton: "btn btn-primary",
          cancelButton: "btn btn-outline-danger ml-1",
        },
        buttonsStyling: false,
      })
        .then((result) => {
          if (result.value) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
            return apis.krip.deleteBerkas(id);
          }
          return false;
        })
        .then((result) => {
          if (result) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
            this.fetchKrips();
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: "Berhasil menghapus berkas",
                icon: "CheckIcon",
                variant: "success",
              },
            });
          }
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal hapus berkas, silahkan coba lagi nanti"
          );
        });
    },
  },
};
</script>

<style></style>
