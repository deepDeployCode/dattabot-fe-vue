<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <validation-observer
        ref="rekomendasiUmum"
      >
        <b-form
          class="mt-1"
          @submit.prevent
        >
          <b-form-group
            label="Permintaan Rekomendasi *"
            label-for="permintaan-rekomendasi"
          >
            <validation-provider
              #default="{ errors }"
              name="Permintaan Rekomendasi"
              rules="required"
            >
              <b-form-input
                id="permintaan-rekomendasi"
                :state="errors.length > 0 ? false : null"
                name="permintaan-rekomendasi"
                type="text"
                readonly
                value="Umum"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Tuliskan Nama Faskes *"
            label-for="nama-faskes"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="Tuliskan Nama Faskes"
              rules="required"
            >
              <b-form-input
                id="nama-faskes"
                :state="errors.length > 0 ? false : null"
                name="nama-faskes"
                type="text"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Tuliskan Alamat Faskes *"
            label-for="nama-faskes"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="Tuliskan Alamat Faskes"
              rules="required"
            >
              <b-form-textarea
                id="nama-faskes"
                placeholder="Contoh: JL. Merak No. 3 ..."
                rows="3"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Pernyataan *"
            label-for="pernyataan"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="Pernyataan"
              rules="required"
            >
              <b-form-checkbox
                id="pernyataan"
                value="A"
                class="custom-control-primary"
              >
                Bersama ini saya menyatakan bahwa saya tidak dalam sanksi berat Organisasi / Etik / Disiplin / Hukum.
              </b-form-checkbox>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Pilih Kompetensi *"
            label-for="pilih-kompetensi"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="pilih-kompetensi"
              rules="required"
            >
              <b-form-select
                id="pilih-kompetensi"
                :options="['8628/KDI/SK/RES/X/2020']"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Ijazah *"
            label-for="ijazah"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="ijazah"
              rules="required"
            >
              <b-form-select
                id="ijazah"
                :options="['Sarjana Kedokteran', 'Dokter Umum']"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Surat Tanda Registrasi *"
            label-for="surat-tanda-registrasi"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="surat-tanda-registrasi"
              rules="required"
            >
              <b-form-select
                id="surat-tanda-registrasi"
                :options="['#83795341 - berlaku sampai 2026-02-13', '#3242 - berlaku sampai 2026-02-13']"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Kartu Tanda Anggota *"
            label-for="kartu-tanda-anggota"
            class="mt-1"
          >
            <img
              src="https://www.staging.idijakpus.or.id/uploads/orang/orang_npa_file/100/A1.png"
              alt="photoResmi"
              class="mb-1 mt-1 img-thumbnail img-fluid mx-auto d-block"
              style="max-height: 250px;"
            >
          </b-form-group>

          <b-form-group
            label="KRIP *"
            label-for="krip"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="krip"
              rules="required"
            >
              <b-form-select
                id="krip"
                :options="['#KRIP1478']"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Surat Keterangan Kerja *"
            label-for="surat-keterangan-kerja"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="surat-keterangan-kerja"
              rules="required"
            >
              <b-form-file
                id="surat-keterangan-kerja"
                :state="errors.length > 0 ? false:null"
                name="surat-keterangan-kerja"
                accept="image/*"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group
            label="Surat Rekomendasi Cabang *"
            label-for="surat-rekomendasi-cabang"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="surat-rekomendasi-cabang"
              rules="required"
            >
              <b-form-file
                id="surat-rekomendasi-cabang"
                :state="errors.length > 0 ? false:null"
                name="surat-rekomendasi-cabang"
                accept="image/*"
              />
              <small class="text-danger">{{ errors[0] }}</small>
              <p class="p-1">
                Catatan:
                Untuk anggota IDI Jakarta Pusat, silahkan unduh <a
                  class="link external"
                  href="https://drive.google.com/file/d/1HaxKWdxdu-4ZkWzA9iJG0J6CJG00EhCz/view"
                >formulir ini</a>, diisi dan unggah kembali.
              </p>
            </validation-provider>
          </b-form-group>
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="$router.push('/rekomendasi/umum/pembayaran')"
          >
            Lanjutkan
          </b-button>
        </b-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import {
  BButton,
  BCard,
  BForm,
  BFormInput,
  BFormSelect,
  BFormFile,
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

// import apis from '@/api'
export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    BCard,
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormInput,
    BFormSelect,
    BFormFile,
    BModal,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
  },
  data() {
    return {
    }
  },
  computed: {},
  mounted() {},
  created() {},
  methods: {},
}
</script>

<style></style>
