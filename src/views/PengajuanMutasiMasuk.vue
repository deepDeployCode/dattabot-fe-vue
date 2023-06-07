<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="font-weight-bold" style="font-size: 16px">Dokumen</div>
      <validation-observer ref="mutasiMasukValidation">
        <b-form class="mt-1" @submit.prevent>
          <b-form-group label="Asal Cabang" label-for="asal-cabang">
            <validation-provider
              #default="{ errors }"
              name="asal-cabang"
              rules="required">
              <b-form-input
                id="asal-cabang"
                :state="errors.length > 0 ? false : null"
                v-model="form.mutmasuk_asal_cabang"
                name="asal-cabang"
                type="text" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Asal Wilayah" label-for="asal-wilayah">
            <validation-provider
              #default="{ errors }"
              name="asal-wilayah"
              rules="required">
              <b-form-input
                id="asal-wilayah"
                :state="errors.length > 0 ? false : null"
                v-model="form.mutmasuk_asal_wilayah"
                name="asal-wilayah"
                type="text" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Tujuan Cabang" label-for="tujuan-cabang">
            <b-form-input
              id="tujuan-cabang"
              name="tujuan-cabang"
              type="text"
              value="Jakarta Pusat"
              disabled />
          </b-form-group>
          <b-form-group
            label="Bukti iuran anggota pada cabang asal"
            label-for="bukti-iuran">
            <validation-provider
              #default="{ errors }"
              name="bukti-iuran"
              rules="required">
              <b-form-file
                id="bukti-iuran"
                v-model="temp.mutmasuk_file_iuranasal"
                :state="errors.length > 0 ? false : null"
                name="bukti-iuran"
                accept="image/*"
                @change="onBuktiIuranChange($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-img
              v-if="form.mutmasuk_file_iuranasal"
              :src="form.mutmasuk_file_iuranasal"
              fluid
              center
              alt="Bukti iuran anggota pada cabang asal"
              class="mt-1"
              style="max-height: 200px" />
          </b-form-group>
          <b-form-group
            label="Surat Keterangan Pindah"
            label-for="surat-pindah">
            <validation-provider
              #default="{ errors }"
              name="surat-pindah"
              rules="required">
              <b-form-file
                id="surat-pindah"
                v-model="temp.mutmasuk_file_ketpindah"
                :state="errors.length > 0 ? false : null"
                name="surat-pindah"
                accept="image/*"
                @change="onSuratKeteranganChange($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-img
              v-if="form.mutmasuk_file_ketpindah"
              :src="form.mutmasuk_file_ketpindah"
              fluid
              center
              alt="Surat Keterangan Pindah"
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
    ValidationProvider,
    ValidationObserver,
    BImg,
    BFormFile,
    BButton,
    // BBadge,
  },
  data() {
    return {
      required,
      form: {
        mutmasuk_file_iuranasal: null,
        mutmasuk_file_ketpindah: null,

        mutmasuk_asal_cabang: "",
        mutmasuk_asal_wilayah: "",
        mutmasuk_tujuan: "",
      },
      temp: {
        mutmasuk_file_iuranasal: null,
        mutmasuk_file_ketpindah: null,
      },
    };
  },
  computed: {},
  methods: {
    validationForm() {
      this.$refs.mutasiMasukValidation.validate().then((success) => {
        if (success) {
          this.submit();
        }
      });
    },
    onSuratKeteranganChange(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.form.mutmasuk_file_ketpindah = result;
        });
      }
    },
    onBuktiIuranChange(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.form.mutmasuk_file_iuranasal = result;
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
    submit() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.mutasiMasuk
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
            "Gagal upload berkas, silahkan coba lagi nanti"
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
