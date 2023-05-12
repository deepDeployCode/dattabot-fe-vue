<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <app-collapse class="p-0">
        <app-collapse-item
          title="Tambah Kompetensi"
          class="shadow-none p-0"
          :is-visible="isTambahKompetensi"
          @visible="changeVisible">
          <validation-observer ref="formKompetensi">
            <b-form class="mt-1" @submit.prevent>
              <b-form-group
                label="Nomor Sertifikat Kompetensi *"
                label-for="nomor-sertif"
                rules="required">
                <validation-provider
                  #default="{ errors }"
                  name="Nomor Sertifikat Kompetensi"
                  rules="required">
                  <b-form-input
                    id="nomor-sertif"
                    :state="errors.length > 0 ? false : null"
                    name="nomor-sertif"
                    type="text"
                    v-model="kompetensi.form.kompetensi_no" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Jenis Kompetensi *"
                label-for="jenis-kompetensi"
                rules="required">
                <validation-provider
                  #default="{ errors }"
                  name="Jenis Kompetensi"
                  rules="required">
                  <b-form-input
                    id="jenis-kompetensi"
                    :state="errors.length > 0 ? false : null"
                    name="jenis-kompetensi"
                    type="text"
                    v-model="kompetensi.form.kompetensi_jenis" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="File" label-for="file">
                <validation-provider
                  #default="{ errors }"
                  name="File"
                  rules="required">
                  <b-form-file
                    id="file"
                    v-model="tempFileKompetensi"
                    :state="errors.length > 0 ? false : null"
                    name="file"
                    @change="onChangeFileKompetensi($event)" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-img
                  v-if="fileKompetensi"
                  fluid
                  center
                  :src="fileKompetensi"
                  alt="fileKompetensi"
                  class="mt-1"
                  style="max-height: 250px" />
              </b-form-group>
              <b-button
                type="submit"
                variant="outline-danger"
                @click="validationForm"
                block>
                Simpan
              </b-button>
            </b-form>
          </validation-observer>
        </app-collapse-item>
      </app-collapse>
      <hr />
      <div class="font-weight-bold mb-1" style="font-size: 16px">
        Daftar KOMPENTENSI
      </div>
      <b-card
        v-for="item in kompetensi.data"
        :key="item.id"
        class="shadow-none border p-1 mb-1"
        no-body>
        <div class="d-flex pb-1 border-bottom">
          <div>
            <div class="font-weight-bold">#ID: {{ item.id }}</div>
            <div class="font-weight-bold">
              #JENIS: {{ item.kompetensi_jenis }}
            </div>
            <div class="font-weight-bold">#NO: {{ item.kompetensi_no }}</div>
          </div>
          <div
            class="ml-auto pointer text-danger"
            @click="deleteKompetensi(item.id)">
            <feather-icon icon="TrashIcon" size="16" class="align-middle" />
          </div>
        </div>
        <div class="pb-1 pt-1">
          <b-img
            v-if="!isPDF(item)"
            :src="getKompetensiFile(item)"
            fluid
            class="mb-25" />
          <div
            v-else
            class="text-primary text-underline pointer"
            @click="viewPdf(getKompetensiFile(item))">
            <u>Lihat berkas</u>
          </div>
        </div>
      </b-card>

      <div
        v-if="kompetensi.isLoading"
        class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading..." variant="danger" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BImg,
  BFormFile,
  BForm,
  BFormGroup,
  BButton,
  BFormInput,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import { required, email } from "@validations";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";
import apis from "@/api";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BCard,
    BImg,
    BFormFile,
    BForm,
    BFormGroup,
    BButton,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    AppCollapse,
    AppCollapseItem,
  },
  data() {
    return {
      required,
      email,
      fileKompetensi: "",
      tempFileKompetensi: null,
      kompetensi: {
        isLoading: false,
        data: [],
        nextPageUrl: null,
        form: {
          kompetensi_no: "",
          kompetensi_jenis: "",
        },
      },
      isTambahKompetensi: false,
    };
  },
  watch: {
    kompentensi: {
      deep: true,
      handler(val) {
        console.log(val.data);
      },
    },
  },
  computed: {
    isPDF() {
      return (item) => {
        if (item.kompetensi_file?.includes(".pdf")) {
          return true;
        }
        return false;
      };
    },
    getKompetensiFile() {
      return (item) => {
        if (item.kompetensi_file) {
          return item.kompetensi_file;
        }
        return null;
      };
    },
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchKompetensi();
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
        if (!this.kompetensi.isLoading && this.kompetensi.nextPageUrl) {
          this.fetchKompetensi(this.kompetensi.nextPageUrl);
        }
      }
    },
    changeVisible(payload) {
      this.isTambahKompetensi = payload;
    },
    validationForm() {
      this.$refs.formKompetensi.validate().then((success) => {
        if (success) {
          this.addKompetensi();
        }
      });
    },

    onChangeFileKompetensi(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          console.log(result);
          this.fileKompetensi = result;
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

    fetchKompetensi(url) {
      this.kompetensi.isLoading = true;
      apis.profile
        .getKompetensi(url)
        .then(({ data }) => {
          if (url) {
            this.kompetensi.data = this.kompetensi.data.concat(data.data);
          } else {
            this.kompetensi.data = data.data;
          }
          this.kompetensi.nextPageUrl = data.next_page_url;
        })
        .finally(() => {
          this.kompetensi.isLoading = false;
        });
    },

    async addKompetensi() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.profile
        .createKompetensi({
          ...this.kompetensi.form,
          kompetensi_file: this.fileKompetensi,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Berhasil upload kompetensi",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.fetchKompetensi();
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal menambahkan KOMPENTENSI, silahkan coba lagi nanti"
          );
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },

    async deleteKompetensi(ids) {
      this.$swal({
        title: "Apakah kamu yakin?",
        text: "Kompetensi yang sudah dihapus, tidak bisa dikembalikan",
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
            return apis.profile.deleteKompetensi(ids);
          }
          return false;
        })
        .then((result) => {
          if (result) {
            this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
            this.$toast({
              component: ToastificationContentVue,
              props: {
                title: "Berhasil menghapus berkas",
                icon: "CheckIcon",
                variant: "success",
              },
            });
            this.fetchKompetensi();
          }
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal hapus kompetensi, silahkan coba lagi"
          );
        });
    },
  },
};
</script>

<style></style>
