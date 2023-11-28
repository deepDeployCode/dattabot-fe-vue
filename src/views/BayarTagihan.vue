<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <validation-observer
        v-if="bayar.data && !bayar.isLoading"
        ref="buktiBayarValidation"
      >
        <b-form class="mt-1" @submit.prevent>
          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Invoice: # {{ bayar.data.data.id }}
                  <!-- <br />
                  id: # {{ bayar.data.user.id }} -->
                </div>
                <small>
                  {{ bayar.data.data.created_at }}
                </small>
                <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>

            <div class="text-center pt-1">
              <div style="font-size: 24px">
                <b>{{ handlerFormatCurrencyRupiah }}</b>
              </div>
              <div class="border-1">
                <span>{{ bayar.data.data.invoice_status }}</span>
              </div>
              <br />
              <!-- card 1 -->
              <b-card
                v-if="
                  bayar.data.data.invoice_status == 'sudah-dibayar' ||
                  bayar.data.data.invoice_status == 'sudah-bayar'
                "
                img-alt="Card image cap"
                img-top
                no-body
              >
                <b-card-body>
                  <b-card-text>
                    selamat tagihan anda sudah lunas harap untuk melakukan login
                    ke dalam aplikasi.
                  </b-card-text>
                </b-card-body>
                <b-card-footer>
                  <small class="text-muted"
                    ><i
                      >Noted: jika akun anda sudah di approve dengan pihak admin
                      harap login ke dalam aplikasi jika tidak silahkan langsung
                      menghubungi pihak admin</i
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
                <div class="font-weight-bold">
                  Informasi Pembayaran : {{ bayar.data.data.invoice_name }}
                </div>
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
                    : {{ bayar.data.data.invoice_name }}
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
                :state="errors.length > 0 ? false : null"
                v-model="tempBuktiBayar"
                accept="image/*"
                @change="buktiBayar($event)"
              />
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
                <tr v-if="bayar.data.data.invoice_file != null">
                  <td>
                    <img
                      :src="bayar.data.data.invoice_file"
                      alt="gallery_image"
                      width="320"
                      height="280"
                    />
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
            @click="validateUploadBuktiBayar"
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
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
  BFormDatepicker,
  BFormTimepicker,
  VBModal,
  BCardText,
  BCardTitle,
  BImg,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

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
    BFormCheckbox,
    BModal,
    BCard,
    BCardText,
    BCardTitle,
    BFormDatepicker,
    BFormTimepicker,
    BImg,
    AppCollapseItem,
    AppCollapse,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      colorVerifyStatusAccount: [{ bg: "danger", title: "Danger card title" }],
      bayar: {
        isLoading: null,
        data: null,
      },
      tempBuktiBayar: null,
      fileInvoices: null,
    };
  },
  computed: {
    handlerFormatCurrencyRupiah() {
      return (
        "Rp. " +
        this.bayar.data.data.invoice_jumlah
          .toString()
          .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
      );
    },
  },
  watch: {
    reg: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() {},
  created() {
    this.getBayarInvoiceIuran();
  },
  methods: {
    validateUploadBuktiBayar() {
      this.$refs.buktiBayarValidation.validate().then((success) => {
        if (success) {
          this.doPembayaran();
        }
      });
    },

    buktiBayar(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.fileInvoices = result;
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

    async getBayarInvoiceIuran() {
      this.bayar.isLoading = true;
      apis.pembayaran
        .setDetailDataBayar(this.$route.params.id_invoices)
        .then(({ data }) => {
          this.bayar.data = data;
        })
        .catch((error) => {
          this.bayar.data = error;
          console.log(error.response);
          this.$router.push("/notifikasi");
        })
        .finally(() => {
          this.bayar.isLoading = false;
        });
    },

    async doPembayaran() {
      try {
        this.$swal({
          title: "Apakah kamu yakin?",
          text: "Bukti bayar yang akan di upload sudah sesuai dengan nominal yang tertera di halaman invoices ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, Upload!",
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
              return apis.pembayaran.setBayar(this.$route.params.id_invoices, {
                invoice_file: this.fileInvoices,
              });
            }
            return false;
          })
          .then((result) => {
            if (result) {
              this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: "Berhasil Upload Bukti Bayar ",
                  icon: "CheckIcon",
                  variant: "success",
                },
              });
              location.reload();
            }
          })
          .catch((error) => {
            this.errorHandler(error, "gagal upload invoices");
          });
      } catch {
        this.errorHandler(error, "kesalahan sistem silahkan coba lagi");
      }
    },
  },
};
</script>

<style></style>
