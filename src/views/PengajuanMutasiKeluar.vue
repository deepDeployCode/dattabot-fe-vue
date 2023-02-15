<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div
        class="font-weight-bold"
        style="font-size: 16px;"
      >
        Dokumen
      </div>

      <b-form
        class="mt-1"
        @submit.prevent
      >
        <b-form-group
          label="Asal Cabang"
          label-for="asal-cabang"
        >
          <b-form-input
            id="asal-cabang"
            v-model="form.mutkeluar_asal_cabang"
            name="asal-cabang"
            type="text"
          />
        </b-form-group>
        <b-form-group
          label="Asal Wilayah"
          label-for="asal-wilayah"
        >
          <b-form-input
            id="asal-wilayah"
            v-model="form.mutkeluar_asal_wilayah"
            name="asal-wilayah"
            type="text"
          />
        </b-form-group>
        <b-form-group
          label="Tujuan Cabang"
          label-for="tujuan-cabang"
        >
          <b-form-input
            id="tujuan-cabang"
            name="tujuan-cabang"
            type="text"
            value="Jakarta Pusat"
            disabled
          />
        </b-form-group>
        <b-form-group
          label="Filte Mutasi"
          label-for="file-mutasi"
        >
          <b-form-file
            id="file-mutasi"
            v-model="temp.mutkeluar_filemutasi"
            name="file-mutasi"
            accept="image/*"
            @change="onFileMutasiChange($event)"
          />
          <b-img
            v-if="form.mutkeluar_filemutasi"
            :src="form.mutkeluar_filemutasi"
            fluid
            center
            alt="Filte Mutasi"
            class="mt-1"
            style="max-height: 200px;"
          />
        </b-form-group>
        <b-button
          type="submit"
          variant="outline-danger"
          block
          @click="submit"
        >
          Simpan
        </b-button>
      </b-form>
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
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import apis from '@/api'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'


export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BFormGroup,
    BForm,
    BFormInput,
    BImg,
    BFormFile,
    BButton,
    // BBadge,
  },
  data() {
    return {
      form: {
        mutkeluar_filemutasi: null,

        mutkeluar_asal_cabang: 'Jakarta Pusat',
        mutkeluar_asal_wilayah: 'DKI Jakarta',
        mutkeluar_tujuan: '',
      },
      temp: {
        mutkeluar_filemutasi: null,
      },
    }
  },
  computed: {

  },
  methods: {
    onFileMutasiChange(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          this.form.mutkeluar_filemutasi = result
        })
      }
    },
    createImage(file, cb) {
      const reader = new FileReader()

      reader.onload = e => {
        cb(e.target.result)
      }
      reader.readAsDataURL(file)
    },
    submit() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      apis.mutasiKeluar.buatPengajuan(this.form)
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Berhasil membuat pengajuan',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ path: '/mutasi', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'Gagal membuat pengajuan, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>

<style>

</style>
