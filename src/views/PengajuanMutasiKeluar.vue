<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <validation-observer ref="mutasiKeluarValidation">
        <div class="font-weight-bold" style="font-size: 16px">Dokumen</div>
        <b-form class="mt-1" @submit.prevent>
          <b-form-group label="Asal Cabang" label-for="asal-cabang">
            <validation-provider
              #default="{ errors }"
              name="asal-cabang"
              rules="required">
              <b-form-input
                id="asal-cabang"
                :state="errors.length > 0 ? false : null"
                v-model="form.mutkeluar_asal_cabang"
                name="asal-cabang"
                type="text" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Asal Wilayah" label-for="asal-wilayah">
            <b-form-input
              id="asal-wilayah"
              v-model="form.mutkeluar_asal_wilayah"
              name="asal-wilayah"
              type="text" />
          </b-form-group>
          <b-form-group label="Tujuan Cabang" label-for="tujuan-cabang">
            <validation-provider
              #default="{ errors }"
              name="tujuan-cabang"
              rules="required">
              <b-form-input
                id="tujuan-cabang"
                name="tujuan-cabang"
                v-model="form.mutkeluar_tujuan_cabang"
                :state="errors.length > 0 ? false : null"
                type="text" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="File Mutasi" label-for="file-mutasi">
            <validation-provider
              #default="{ errors }"
              name="file-mutasi"
              rules="required">
              <b-form-file
                id="file-mutasi"
                :state="errors.length > 0 ? false : null"
                v-model="temp.mutkeluar_filemutasi"
                name="file-mutasi"
                accept="image/*"
                @change="onFileMutasiChange($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-img
              v-if="form.mutkeluar_filemutasi"
              :src="form.mutkeluar_filemutasi"
              fluid
              center
              alt="Filte Mutasi"
              class="mt-1"
              style="max-height: 200px" />
          </b-form-group>
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validationForm">
            Simpan
          </b-button>
        </b-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import {
  BFormGroup,
  BForm,
  BFormInput,
  BFormFile,
  BImg,
  BButton,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import apis from "@/api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BFormGroup,
    BForm,
    BFormInput,
    BImg,
    BFormFile,
    ValidationProvider,
    ValidationObserver,
    BButton,

    // BBadge,
  },
  data() {
    return {
      required,
      form: {
        mutkeluar_filemutasi: null,

        mutkeluar_asal_cabang: "Jakarta Pusat",
        mutkeluar_asal_wilayah: "DKI Jakarta",
        mutkeluar_tujuan_cabang: "",
      },
      temp: {
        mutkeluar_filemutasi: null,
      },
    };
  },
  computed: {},
  methods: {
    onFileMutasiChange(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.form.mutkeluar_filemutasi = result;
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
    validationForm() {
      this.$refs.mutasiKeluarValidation.validate().then((success) => {
        if (success) {
          this.submit();
        }
      });
    },
    submit() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.mutasiKeluar
        .buatPengajuan(this.form)
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Berhasil membuat pengajuan",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.$router.push({ path: "/mutasi", replace: true });
        })
        .catch((error) => {
          this.errorHandler(
            error,
            "Gagal membuat pengajuan, silahkan coba lagi nanti"
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
