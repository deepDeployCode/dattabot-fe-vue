<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <validation-observer v-if="invoices.data && !invoices.isLoading" ref="buktiBayarValidation">
        <b-form class="mt-1" @submit.prevent>

          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Invoice: # {{ invoices.data.invoice.id }}
                  <br>
                  IdRekomendasi: # {{ invoices.data.user.id }}
                </div>
                <small>
                  {{ invoices.data.invoice.created_at }}
                </small>
                <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>

            <div class="text-center pt-1">
              <div style="font-size: 24px">
                <b>Rp {{ invoices.data.invoice.reginvoice_jumlah }}</b>
              </div>
              <div class="border-1">
                <span>{{ invoices.data.invoice.reginvoice_status }}</span>
              </div>
              <br>
              <!-- card 1 -->
              <b-card
                v-if="invoices.data.invoice.reginvoice_status == 'sudah-dibayar' || invoices.data.invoice.reginvoice_status == 'sudah-bayar'"
                img-alt="Card image cap" img-top no-body>
                <b-card-body>
                  <b-card-text>
                    selanjutnya lakukan pengaktifan akun simfoni anda dengan cara menghubungi pihak admin.
                  </b-card-text>
                </b-card-body>
                <b-card-footer>
                  <small class="text-muted"><i>Noted: jika akun anda sudah aktif maka anda dapat login di aplikasi
                      simfoni</i></small>
                </b-card-footer>
              </b-card>
              <b-card v-else img-alt="Card image cap" img-top no-body>
                <b-card-footer>
                  <small class="text-muted"><i>Noted: harap hubungi pihak admin agar mempercepat proses aktivasi akun
                      anda</i></small>
                </b-card-footer>
              </b-card>
            </div>
          </b-card>
          <b-card class="shadow-none border p-1 mb-1" no-body>
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
                    : {{ invoices.data.invoice.reginvoice_nama }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-form-group label="Upload Bukti Bayar *" label-for="upload-bukti-bayar" class="mt-1">
            <validation-provider #default="{ errors }" name="upload-bukti-bayar" rules="required">
              <b-form-file id="upload-bukti-bayar" :state="errors.length > 0 ? false : null" v-model="tempBuktiBayar"
                accept="image/*" @change="buktiBayar($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Bukti Pembayaran
                </div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr v-if="invoices.data.invoice.reginvoice_file != null">
                  <td>
                    <img :src="invoices.data.invoice.reginvoice_file" alt="gallery_image" width="320" height="280" />
                  </td>
                </tr>
                <tr v-else>
                  <p>belum ada bukti screenshoot</p>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-button type="submit" variant="outline-danger" block @click="validateUploadBuktiBayar">
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
  VBModal,
  BCardText,
  BImg,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'

import apis from '@/api'

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
    BImg,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      required,
      invoices: {
        data: null,
        isLoading: true,
      },
      buktiBayarBase64: {},
      tempBuktiBayar: null,
      fileBerkas: null,
      // form: {
      //   reksip_kategori: '',
      //   reksip_id: '',
      //   reksip_nama_instansi: '',
      //   reksip_pend_file: '',
      //   reksip_str_file: '',
      //   reksip_tidak_kena_sanksi: '',
      //   reksip_npa_file: '',
      //   reksip_alamat_instansi: '',
      // }
    }
  },
  /**
   * computer method is not use karena bukan untuk fetch file ini hanya invoice jadi di maitiin
   */
  // computed: {
  //   photoIjazah() {
  //     return item => {
  //       if (item.pend_ijazah_file) {
  //         if (!item.pend_ijazah_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/pend/pend_ijazah_file/${item.id}/${item.pend_ijazah_file}`
  //         }
  //         return item.pend_ijazah_file
  //       }
  //       return null
  //     }
  //   },
  //   reksipIjazah() {
  //     return item => {
  //       if (item.reksip_pend_file) {
  //         if (!item.reksip_pend_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_pend_file/${item.id}/${item.reksip_pend_file}`
  //         }
  //         return item.reksip_pend_file
  //       }

  //       return null
  //     }
  //   },
  //   photoStr() {
  //     return item => {
  //       if (item.str_file) {
  //         if (!item.str_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/str/str_file/${item.id}/${item.str_file}`
  //         }
  //         return item.str_file
  //       }
  //       return null
  //     }
  //   },
  //   reksipSTR() {
  //     return item => {
  //       if (item.reksip_str_file) {
  //         if (!item.reksip_str_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_str_file/${item.id}/${item.reksip_str_file}`
  //         }
  //         return item.reksip_str_file
  //       }

  //       return null
  //     }
  //   },
  //   reksipKTA() {
  //     return item => {
  //       if (item.reksip_npa_file) {
  //         if (!item.reksip_npa_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_npa_file/${item.id}/${item.reksip_npa_file}`
  //         }
  //         return item.reksip_npa_file
  //       }

  //       return null
  //     }
  //   },
  //   photoKRIP() {
  //     return item => {
  //       if (item.krip_file) {
  //         if (!item.krip_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/krip/krip_file/${item.id}/${item.krip_file}`
  //         }
  //         return item.krip_file
  //       }
  //       return null
  //     }
  //   },
  //   reksipKRIP() {
  //     return item => {
  //       if (item.reksip_krip_file) {
  //         if (!item.reksip_krip_file.includes('https')) {
  //           return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_krip_file/${item.id}/${item.reksip_krip_file}`
  //         }
  //         return item.reksip_krip_file
  //       }

  //       return null
  //     }
  //   },
  // },
  watch: {
    invoices: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() { },
  created() {
    this.fetchInvoiceCalonAnggota()
  },
  methods: {
    // changeKompetensi(item) {
    //   this.rekomendasi.data.reksip_kompetensi_file = item.kompetensi_file
    //   this.rekomendasi.data.reksip_kompetensi_jenis = item.kompetensi_jenis
    //   this.rekomendasi.data.reksip_kompetensi_no = item.kompetensi_no
    //   this.$bvModal.hide('modal-kompetensi')
    // },
    // changeIjazah(item) {
    //   this.rekomendasi.data.reksip_pend_file = this.photoIjazah(item)
    //   this.$bvModal.hide('modal-ijazah')
    // },
    // changeSTR(item) {
    //   this.rekomendasi.data.reksip_str_file = this.photoStr(item)
    //   this.rekomendasi.data.reksip_str_no = item.str_no
    //   this.rekomendasi.data.reksip_str_tgl_berakhir = item.str_tgl_berakhir
    //   this.$bvModal.hide('modal-str')
    // },
    // changeKRIP(item) {
    //   this.rekomendasi.data.reksip_krip_file = this.photoKRIP(item)
    //   this.$bvModal.hide('modal-krip')
    // },

    validationForm() {
      this.$refs.rekomendasiValidation.validate().then(success => {
        if (success) {
          this.submitRekomendasi()
        }
      })
    },

    validateUploadBuktiBayar() {
      this.$refs.buktiBayarValidation.validate().then(success => {
        if (success) {
          this.submitBuktiBayar()
        }
      })
    },

    buktiBayar(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          this.fileBerkas = result
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


    async submitBuktiBayar() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      try {
        await apis.invoice.uploadBuktiBayar(this.invoices.data.invoice.id, { reginvoice_file: this.fileBerkas })
        this.successHandler('berhasil upload bukti bayar')
      } catch (error) {
        this.errorHandler(error, 'gagal upload bukti bayar')
      } finally {
        this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
      }
    },

    // method ini buat rekomendasi umum dan spesialis jadi maiitn

    // submitRekomendasi() {
    //   this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
    //   apis.rekomendasi.rekomendasiInput({
    //     reksip_kategori: 'umum',
    //     reksip_id: this.rekomendasi.data.id,
    //     reksip_nama_instansi: this.rekomendasi.data.reksip_nama_instansi,
    //     reksip_pend_file: this.rekomendasi.data.reksip_pend_file,
    //     reksip_str_file: this.rekomendasi.data.reksip_str_file,
    //     reksip_tidak_kena_sanksi: this.rekomendasi.data.reksip_tidak_kena_sanksi,
    //     reksip_alamat_instansi: this.rekomendasi.data.reksip_alamat_instansi,
    //     reksip_kompetensi_no: this.rekomendasi.data.reksip_kompetensi_no,
    //     reksip_kompetensi_jenis: this.rekomendasi.data.reksip_kompetensi_jenis,
    //     reksip_krip_file: this.rekomendasi.data.reksip_krip_file
    //   })
    //     .then(() => {
    //       apis.rekomendasi.rekomendasiPublish({ reksip_id: this.rekomendasi.data.id })
    //         .then(() => {
    //           this.successHandler('berhasil created invoice')
    //           location.reload()
    //         })
    //         .catch(error => {
    //           this.errorHandler(error, 'gagal create invoice silahkan coba lagi')
    //         })
    //     })
    //     .catch(error => {
    //       this.errorHandler(error, 'rekomendasi gagal silahkan coba lagi')
    //     })
    //     .finally(() => {
    //       this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
    //     })
    // },

    fetchInvoiceCalonAnggota() {
      this.invoices.isLoading = true
      apis.invoice.getInvoice(this.$route.params.id)
        .then(({ data }) => {
          this.invoices.data = data
        })
        .finally(() => {
          this.invoices.isLoading = false
        })
    },
  },
}
</script>

<style></style>