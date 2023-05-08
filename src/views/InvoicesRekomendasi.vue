<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <validation-observer
        v-if="rekomendasi.data && !rekomendasi.isLoading"
        ref="buktiBayarValidation">
        <b-form class="mt-1" @submit.prevent>
          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Invoice: # {{ rekomendasi.data.invoices.id }}
                  <br />
                  IdRekomendasi: # {{ rekomendasi.data.id }}
                </div>
                <small>
                  {{ rekomendasi.data.invoices.created_at }}
                </small>
                <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>

            <div class="text-center pt-1">
              <div style="font-size: 24px">
                <b>Rp {{ rekomendasi.data.invoices.invoice_jumlah }}</b>
              </div>
              <div class="border-1">
                <span>{{ rekomendasi.data.invoices.invoice_status }}</span>
              </div>
              <br />
              <!-- card 1 -->
              <b-card
                v-if="
                  rekomendasi.data.invoices.invoice_status == 'sudah-dibayar' ||
                  rekomendasi.data.invoices.invoice_status == 'sudah-bayar'
                "
                img-alt="Card image cap"
                img-top
                no-body>
                <b-card-body>
                  <b-card-text>
                    selanjutnya lakukan pengaktifan rekomendasi izin praktik
                    anda dengan cara menghubungi pihak admin.
                  </b-card-text>
                </b-card-body>
                <b-card-footer>
                  <small class="text-muted"
                    ><i
                      >Noted: jika rekom sudah terbit maka anda dapat melihat
                      kembali data rekom yang sudah anda ajukan</i
                    ></small
                  >
                </b-card-footer>
              </b-card>
              <b-card v-else img-alt="Card image cap" img-top no-body>
                <b-card-footer>
                  <small class="text-muted"
                    ><i
                      >Noted: harap hubungi pihak admin agar mempercepat proses
                      verifikasi invoice anda</i
                    ></small
                  >
                </b-card-footer>
              </b-card>
            </div>
          </b-card>
          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">Informasi Pembayaran</div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr>
                  <td>Bank</td>
                  <td class="font-weight-bold">: Bank Syariah Indonesia</td>
                </tr>
                <tr>
                  <td>Akun</td>
                  <td class="font-weight-bold">: IDI JAKPUS</td>
                </tr>
                <tr>
                  <td>Rekening</td>
                  <td class="font-weight-bold">: 7132822063</td>
                </tr>
                <tr>
                  <td>Keterangan</td>
                  <td class="font-weight-bold">
                    : {{ rekomendasi.data.invoices.invoice_name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-form-group
            label="Upload Bukti Bayar *"
            label-for="upload-bukti-bayar"
            class="mt-1">
            <validation-provider
              #default="{ errors }"
              name="upload-bukti-bayar"
              rules="required">
              <b-form-file
                id="upload-bukti-bayar"
                :state="errors.length > 0 ? false : null"
                v-model="tempBuktiBayar"
                accept="image/*"
                @change="sendBuktiBayarRekomIzinPraktik($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">Bukti Pembayaran</div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr v-if="rekomendasi.data.invoices.invoice_file != null">
                  <td>
                    <img
                      :src="rekomendasi.data.invoices.invoice_file"
                      alt="gallery_image"
                      width="320"
                      height="280" />
                  </td>
                </tr>
                <tr v-else>
                  <p>belum ada bukti screenshoot</p>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validateUploadBuktiBayar">
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
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
  BFormDatepicker,
  BFormTimepicker,
  VBModal,
  BCardText,
  BImg,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required } from "@validations";

import apis from "@/api";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormInput,
    BFormSelect,
    BFormFile,
    BFormGroup,
    BFormTextarea,
    BFormDatepicker,
    BFormTimepicker,
    BFormCheckbox,
    BModal,
    BCard,
    BCardText,
    BImg,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      required,
      rekomendasi: {
        data: null,
        isLoading: true,
      },
      buktiBayarBase64: {},
      tempBuktiBayar: null,
      invoicesFile: null,
    };
  },
  computed: {},
  watch: {
    rekomendasi: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() {},
  created() {
    this.fetchRekomendasiById();
  },
  methods: {
    validateUploadBuktiBayar() {
      this.$refs.buktiBayarValidation.validate().then((success) => {
        if (success) {
          this.submitBuktiBayar();
        }
      });
    },

    sendBuktiBayarRekomIzinPraktik(e) {
      const { files } = e.target;
      if (files.length) {
        this.createBayarRekomIzinPraktik(files[0], (result) => {
          this.invoicesFile = result;
        });
      }
    },

    createBayarRekomIzinPraktik(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    async submitBuktiBayar() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      try {
        await apis.rekomendasi.rekomendasiInvoices({
          reksip_id: this.rekomendasi.data.id,
          invoice_file: this.invoicesFile,
        });
        this.successHandler("berhasil upload bukti bayar");
        location.reload();
      } catch (error) {
        this.errorHandler(error, "gagal upload bukti bayar");
      } finally {
        this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
      }
    },

    fetchRekomendasiById() {
      this.rekomendasi.isLoading = true;
      apis.rekomendasi
        .getById(this.$route.params.id)
        .then(({ data }) => {
          this.rekomendasi.data = data;
        })
        .finally(() => {
          this.rekomendasi.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
