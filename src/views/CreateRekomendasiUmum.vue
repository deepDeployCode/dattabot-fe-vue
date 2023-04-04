<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div v-if="rekomendasi.data.invoice_id == 0" class="p-2 mx-auto">
      <validation-observer v-if="rekomendasi.data && !rekomendasi.isLoading" ref="rekomendasiValidation">
        <!-- form data submit rekomendasi-->
        <b-form class="mt-1" @submit.prevent>
          <b-form-group label="Permintaan Rekomendasi *" label-for="permintaan-rekomendasi">
            <validation-provider #default="{ errors }" name="Permintaan Rekomendasi" rules="required">
              <b-form-input id="permintaan-rekomendasi" :state="errors.length > 0 ? false : null"
                name="permintaan-rekomendasi" type="text" readonly :value="rekomendasi.data.reksip_kategori_detail" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Tuliskan Nama Faskes *" label-for="nama-faskes" class="mt-1">
            <validation-provider #default="{ errors }" name="Tuliskan Nama Faskes" rules="required">
              <b-form-input id="nama-faskes" v-model="rekomendasi.data.reksip_nama_instansi"
                :state="errors.length > 0 ? false : null" name="nama-faskes" type="text" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Tuliskan Alamat Faskes *" label-for="nama-faskes" class="mt-1">
            <validation-provider #default="{ errors }" name="Tuliskan Alamat Faskes" rules="required">
              <b-form-textarea id="nama-faskes" v-model="rekomendasi.data.reksip_alamat_instansi"
                placeholder="Contoh: JL. Merak No. 3 ..." rows="3" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Pernyataan *" label-for="pernyataan" class="mt-1">
            <validation-provider #default="{ errors }" name="Pernyataan" rules="required">
              <b-form-checkbox id="pernyataan" v-model="rekomendasi.data.reksip_tidak_kena_sanksi"
                class="custom-control-primary" :value="true">
                Bersama ini saya menyatakan bahwa saya tidak dalam sanksi berat Organisasi / Etik / Disiplin / Hukum.
              </b-form-checkbox>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Pilih Kompetensi *" label-for="pilih-kompetensi" class="mt-1">
            <b-card v-if="rekomendasi.data.reksip_kompetensi_jenis && rekomendasi.data.reksip_kompetensi_no"
              footer-tag="footer" class="shadow-none border pointer mt-1" footer-bg-variant="warning"
              footer-text-variant="dark" footer-class="font-weight-bold pointer text-center">
              <b-card-text class="font-weight-bold">
                {{ rekomendasi.data.reksip_kompetensi_jenis }}
              </b-card-text>
              <b-card-text>
                Nomor Sertifikat{{ " : " }}{{ rekomendasi.data.reksip_kompetensi_no }}
              </b-card-text>
              <template #footer>
                <div v-b-modal.modal-kompetensi>
                  Ganti Kompetensi Ini
                </div>
              </template>
            </b-card>
            <b-button v-else v-b-modal.modal-kompetensi variant="danger">
              Pilih
            </b-button>

          </b-form-group>

          <b-form-group label="Ijazah *" label-for="ijazah" class="mt-1">
            <b-card v-if="rekomendasi.data.reksip_pend_file" footer-tag="footer" class="shadow-none border pointer mt-1"
              footer-bg-variant="warning" footer-text-variant="dark" footer-class="font-weight-bold pointer text-center">
              <b-img fluid center :src="reksipIjazah(rekomendasi.data)" alt="file izajah" class="mt-1"
                style="max-height: 250px;" />
              <template #footer>
                <div v-b-modal.modal-ijazah>
                  Ganti Ijazah Ini
                </div>
              </template>
            </b-card>
            <b-button v-else v-b-modal.modal-ijazah variant="danger">
              Pilih
            </b-button>
          </b-form-group>

          <b-form-group label="Surat Tanda Registrasi *" label-for="surat-tanda-registrasi" class="mt-1">
            <b-card
              v-if="rekomendasi.data.reksip_str_tgl_berakhir || rekomendasi.data.reksip_str_no || rekomendasi.data.reksip_str_file"
              footer-tag="footer" class="shadow-none border pointer mt-1" footer-bg-variant="warning"
              footer-text-variant="dark" footer-class="font-weight-bold pointer text-center">
              <table>
                <tr>
                  <td>Nomor STR</td>
                  <td><span class="ml-1 mr-1">:</span>
                    <span v-if="rekomendasi.data.reksip_str_no != ''">{{ rekomendasi.data.reksip_str_no }}</span>
                    <span v-else>{{ 'nomor str not found' }}</span>
                  </td>
                </tr>
                <tr>
                  <td>Berlaku Sampai</td>
                  <td><span class="ml-1 mr-1">:</span>
                    <span v-if="rekomendasi.data.reksip_str_tgl_berakhir != ''">{{
                      rekomendasi.data.reksip_str_tgl_berakhir }}</span>
                    <span v-else>{{ 'tanggal berakhir not fond' }}</span>
                  </td>
                </tr>
              </table>
              <b-img v-if="rekomendasi.data.reksip_str_file" fluid center :src="reksipSTR(rekomendasi.data)" alt="str"
                class="mt-1" style="max-height: 250px;" />
              <template #footer>
                <div v-b-modal.modal-str>
                  Ganti STR Ini
                </div>
              </template>
            </b-card>
            <b-button v-else v-b-modal.modal-str variant="danger">
              Pilih
            </b-button>
          </b-form-group>

          <b-form-group label="Kartu Tanda Anggota *" label-for="kartu-tanda-anggota" class="mt-1">
            <b-card class="shadow-none border pointer mt-1">
              <b-img v-if="rekomendasi.data.reksip_npa_file" fluid center :src="reksipKTA(rekomendasi.data)" alt="str"
                class="mt-1" style="max-height: 250px;" />
            </b-card>
          </b-form-group>

          <b-form-group label="KRIP *" label-for="krip" class="mt-1">
            <b-card v-if="rekomendasi.data.reksip_krip_file" footer-tag="footer" class="shadow-none border pointer mt-1"
              footer-bg-variant="warning" footer-text-variant="dark" footer-class="font-weight-bold pointer text-center">
              <b-img v-if="rekomendasi.data.reksip_krip_file" fluid center :src="reksipKRIP(rekomendasi.data)" alt="str"
                class="mt-1" style="max-height: 250px;" />
              <template #footer>
                <div v-b-modal.modal-krip>
                  Ganti KRIP Ini
                </div>
              </template>
            </b-card>
            <b-button v-else v-b-modal.modal-krip variant="danger">
              Pilih
            </b-button>
          </b-form-group>
          <!-- <b-form-group label="Surat Keterangan Kerja *" label-for="surat-keterangan-kerja" class="mt-1">
            <validation-provider #default="{ errors }" name="surat-keterangan-kerja"
              v-model="rekomendasi.data.surat_keterangan_kerja">
              <b-form-file id="surat-keterangan-kerja" :state="errors.length > 0 ? false : null"
                name="surat-keterangan-kerja" accept="image/*" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-form-group label="Surat Rekomendasi Cabang *" label-for="surat-rekomendasi-cabang" class="mt-1">
            <validation-provider #default="{ errors }" name="surat-rekomendasi-cabang"
              v-model="rekomendasi.data.surat_rekomendasi_cabang">
              <b-form-file id="surat-rekomendasi-cabang" :state="errors.length > 0 ? false : null"
                name="surat-rekomendasi-cabang" accept="image/*" />
              <small class="text-danger">{{ errors[0] }}</small>
              <p class="p-1">
                Catatan:
                Untuk anggota IDI Jakarta Pusat, silahkan unduh <a class="link external"
                  href="https://drive.google.com/file/d/1HaxKWdxdu-4ZkWzA9iJG0J6CJG00EhCz/view">formulir ini</a>, diisi
                dan unggah kembali.
              </p>
            </validation-provider>
          </b-form-group> -->
          <b-button type="submit" variant="outline-danger" block @click="validationForm">
            Lanjutkan
          </b-button>
        </b-form>
      </validation-observer>


      <!-- fetch file -->
      <b-modal id="modal-kompetensi" title="Pilih Kompetensi" hide-footer>
        <b-card v-for="item in rekomendasi.data.kompetensi" :key="item.id" footer="Pilih Kompetensi Ini"
          footer-tag="footer" class="shadow-none border pointer" footer-bg-variant="warning" footer-text-variant="dark"
          footer-class="font-weight-bold pointer text-center" @click="changeKompetensi(item)">
          <b-card-text class="font-weight-bold">
            {{ item.kompetensi_jenis }}
          </b-card-text>
          <b-card-text>
            Nomor Kompetensi{{ " : " }}{{ item.kompetensi_no }}
          </b-card-text>
        </b-card>
      </b-modal>

      <b-modal id="modal-ijazah" title="Pilih Ijazah" hide-footer>
        <b-card v-for="item in rekomendasi.data.pendidikan" :key="item.id" footer="Pilih Ijazah Ini" footer-tag="footer"
          class="shadow-none border pointer" footer-bg-variant="warning" footer-text-variant="dark"
          footer-class="font-weight-bold pointer text-center" @click="changeIjazah(item)">
          <b-card-text class="font-weight-bold">
            Nama Studi : {{ item.pend_nama_studi }}
          </b-card-text>
          <b-img v-if="item.pend_ijazah_file" fluid center :src="photoIjazah(item)" alt="ijazah" class="mt-1"
            style="max-height: 250px;" />
        </b-card>
      </b-modal>

      <b-modal id="modal-str" title="Pilih Surat Tanda Registrasi" hide-footer>
        <b-card v-for="item in rekomendasi.data.str" :key="item.id" footer="Pilih STR Ini" footer-tag="footer"
          class="shadow-none border pointer" footer-bg-variant="warning" footer-text-variant="dark"
          footer-class="font-weight-bold pointer text-center" @click="changeSTR(item)">
          <table>
            <tr>
              <td>Nomor STR</td>
              <td><span class="ml-1 mr-1">:</span>
                <span v-if="item.str_no != ''">{{ item.str_no }}</span>
                <span v-else>{{ 'nomor tidak di temukan' }}</span>
              </td>
            </tr>
            <tr>
              <td>Berlaku Sampai</td>
              <td><span class="ml-1 mr-1">:</span>
                <span v-if="item.str_tgl_berakhir != ''">{{ item.str_tgl_berakhir }}</span>
                <span v-else>{{ 'tanggal berakhir tidak di temukan' }}</span>
              </td>
            </tr>
          </table>

          <b-img v-if="item.str_file" fluid center :src="photoStr(item)" alt="str" class="mt-1"
            style="max-height: 250px;" />

        </b-card>
      </b-modal>

      <b-modal id="modal-krip" title="Pilih KRIP" hide-footer>
        <b-card v-for="item in rekomendasi.data.krip" :key="item.id" footer="Pilih KRIP Ini" footer-tag="footer"
          class="shadow-none border pointer" footer-bg-variant="warning" footer-text-variant="dark"
          footer-class="font-weight-bold pointer text-center" @click="changeKRIP(item)">
          <b-img v-if="item.krip_file" fluid center :src="photoKRIP(item)" alt="krip" class="mt-1"
            style="max-height: 250px;" />
        </b-card>
      </b-modal>
    </div>
    <div v-else class="p-2 mx-auto">
      <validation-observer ref="invoiceRekomendasiUmum">
        <b-form class="mt-1" @submit.prevent>

          <b-card class="shadow-none border p-1 mb-1" no-body>
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
                    : Surat Rekomendasi Izin Praktik UMUM
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-form-group label="Upload Bukti Bayar *" label-for="upload-bukti-bayar" class="mt-1">
            <validation-provider #default="{ errors }" name="upload-bukti-bayar" rules="required">
              <b-form-file id="upload-bukti-bayar" :state="errors.length > 0 ? false : null" name="upload-bukti-bayar"
                accept="image/*" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-button type="submit" variant="outline-danger" block>
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
      rekomendasi: {
        data: null,
        isLoading: true,
      },
      form: {
        reksip_kategori: '',
        reksip_id: '',
        reksip_nama_instansi: '',
        reksip_pend_file: '',
        reksip_str_file: '',
        reksip_tidak_kena_sanksi: '',
        reksip_npa_file: '',
        reksip_alamat_instansi: '',
      }
    }
  },
  computed: {
    imgNotFound() {
      return `https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png`
    },
    photoIjazah() {
      return item => {
        if (item.pend_ijazah_file) {
          if (!item.pend_ijazah_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/pend/pend_ijazah_file/${item.id}/${item.pend_ijazah_file}`
          }
          return item.pend_ijazah_file
        }
        return null
      }
    },
    reksipIjazah() {
      return item => {
        if (item.reksip_pend_file) {
          if (!item.reksip_pend_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_pend_file/${item.id}/${item.reksip_pend_file}`
          }
          return item.reksip_pend_file
        }

        return null
      }
    },
    photoStr() {
      return item => {
        if (item.str_file) {
          if (!item.str_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/str/str_file/${item.id}/${item.str_file}`
          }
          return item.str_file
        }
        return null
      }
    },
    reksipSTR() {
      return item => {
        if (item.reksip_str_file) {
          if (!item.reksip_str_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_str_file/${item.id}/${item.reksip_str_file}`
          }
          return item.reksip_str_file
        }

        return null
      }
    },
    reksipKTA() {
      return item => {
        if (item.reksip_npa_file) {
          if (!item.reksip_npa_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_npa_file/${item.id}/${item.reksip_npa_file}`
          }
          return item.reksip_npa_file
        }

        return null
      }
    },
    photoKRIP() {
      return item => {
        if (item.krip_file) {
          if (!item.krip_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/krip/krip_file/${item.id}/${item.krip_file}`
          }
          return item.krip_file
        }
        return null
      }
    },
    reksipKRIP() {
      return item => {
        if (item.reksip_krip_file) {
          if (!item.reksip_krip_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/reksip/reksip_krip_file/${item.id}/${item.reksip_krip_file}`
          }
          return item.reksip_krip_file
        }

        return null
      }
    },
  },
  watch: {
    rekomendasi: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() { },
  created() {
    this.fetchRekomandasi()
  },
  methods: {
    changeKompetensi(item) {
      this.rekomendasi.data.reksip_kompetensi_file = item.kompetensi_file
      this.rekomendasi.data.reksip_kompetensi_jenis = item.kompetensi_jenis
      this.rekomendasi.data.reksip_kompetensi_no = item.kompetensi_no
      this.$bvModal.hide('modal-kompetensi')
    },
    changeIjazah(item) {
      this.rekomendasi.data.reksip_pend_file = this.photoIjazah(item)
      this.$bvModal.hide('modal-ijazah')
    },
    changeSTR(item) {
      this.rekomendasi.data.reksip_str_file = this.photoStr(item)
      this.rekomendasi.data.reksip_str_no = item.str_no
      this.rekomendasi.data.reksip_str_tgl_berakhir = item.str_tgl_berakhir
      this.$bvModal.hide('modal-str')
    },
    changeKRIP(item) {
      this.rekomendasi.data.reksip_krip_file = this.photoKRIP(item)
      this.$bvModal.hide('modal-krip')
    },

    validationForm() {
      this.$refs.rekomendasiValidation.validate().then(success => {
        if (success) {
          this.submitRekomendasi()
        }
      })
    },


    submitRekomendasi() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      const newForm = { ...this.form }
      apis.rekomendasi.rekomendasiInput(newForm)
        .then(() => {
          this.successHandler('berhasil update rekomendasi')
        })
        .catch(error => {
          this.errorHandler(error, 'rekomendasi gagal silahkan coba lagi')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },

    fetchRekomandasi() {
      this.rekomendasi.isLoading = true
      apis.rekomendasi.getById(this.$route.params.id)
        .then(({ data }) => {
          this.rekomendasi.data = data
        })
        .finally(() => {
          this.rekomendasi.isLoading = false
        })
    },
  },
}
</script>

<style></style>
