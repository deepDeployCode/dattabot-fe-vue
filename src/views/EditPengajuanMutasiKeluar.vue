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
          label="Bukti iuran anggota pada cabang asal"
          label-for="bukti-iuran"
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
            alt="Bukti iuran anggota pada cabang asal"
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
import storage from '@/helpers/storage'

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

        mutkeluar_asal_cabang: '',
        mutkeluar_asal_wilayah: '',
        mutkeluar_tujuan: '',
      },
      temp: {
        mutkeluar_filemutasi: null,
      },
    }
  },
  computed: {

  },
  mounted() {
    this.form = storage.getStorage('mutkeluar')
    this.temp = {
      mutkeluar_filemutasi: this.form.mutkeluar_filemutasi,
    }
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
      apis.mutasiKeluar.updatePengajuan({
        ...this.form,
        mutkeluar_id: this.form.id,
        mutkeluar_tujuan_cabang: 'Jakarta Pusat',
        mutkeluar_rek_bank: '-',
        mutkeluar_rek_holder: '-',
        mutkeluar_rek_num: '-',
      })
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Berhasil mengupdate pengajuan',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ path: '/mutasi', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'Gagal Edit Pengajuan, silahkan coba lagi nanti')
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
