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

          <b-card
            class="shadow-none border p-1 mb-1"
            no-body
          >
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Invoice # 2738
                </div>
                <small>
                  2023-02-26T05:57:28.083Z
                </small>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>

            <div class="text-center pt-1">
              <div style="font-size: 24px">
                <b>Rp 200.000</b>
              </div>
              <div class="border-1">
                <span>belum-dibayar</span>
              </div>
            </div>
          </b-card>
          <b-card
            class="shadow-none border p-1 mb-1"
            no-body
          >
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Informasi Pembayaran
                </div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr>
                  <td>Bank</td>
                  <td class="font-weight-bold">
                    : Bank Syariah Indonesia
                  </td>
                </tr>
                <tr>
                  <td>Akun</td>
                  <td class="font-weight-bold">
                    : IDI JAKPUS
                  </td>
                </tr>
                <tr>
                  <td>Rekening</td>
                  <td class="font-weight-bold">
                    : 7132822063
                  </td>
                </tr>
                <tr>
                  <td>Keterangan</td>
                  <td class="font-weight-bold">
                    : Surat Rekomendasi Izin Praktik UMUM
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-form-group
            label="Upload Bukti Bayar *"
            label-for="upload-bukti-bayar"
            class="mt-1"
          >
            <validation-provider
              #default="{ errors }"
              name="upload-bukti-bayar"
              rules="required"
            >
              <b-form-file
                id="upload-bukti-bayar"
                :state="errors.length > 0 ? false:null"
                name="upload-bukti-bayar"
                accept="image/*"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-button
            type="submit"
            variant="outline-danger"
            block
          >
            Simpan
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
