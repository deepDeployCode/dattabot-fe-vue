<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex flex-row">
        <b-button variant="outline-danger" block @click="inputRekomendasi(kategori = 'spesialis')">
          Permintaan Baru
        </b-button>
      </div>

      <div class="mt-1" v-for="item in rekomendasi.data" :key="item.id">

        <b-card v-if="item.reksip_kategori != 'umum' && item.reksip_kategori != 'Umum'"
          class="shadow-none border p-1 mb-1" no-body>
          <div class="d-flex pb-1 border-bottom">
            <div>
              <div class="font-weight-bold" v-if="item.reksip_kategori != 'umum' && item.reksip_kategori != 'Umum'">
                #{{ item.id }} - {{ item.reksip_kategori }}
              </div>
              <!-- label status verif rekom izin praktek-->
              <b-badge v-if="item.reksip_terbit != false && item.invoice_id != 0"
                variant="success font-weight–light mt-25">
                Sudah Terbit
              </b-badge>
              <b-badge v-else-if="item.reksip_terbit == false && item.invoice_id != 0"
                variant="warning font-weight–light mt-25">
                Belum Terbit
              </b-badge>
              <b-badge v-else variant="danger font-weight–light mt-25">
                Belum Terverifikasi
              </b-badge>
            </div>
            <!-- gak di pake yang menu bagian sudut kanan -->
            <div v-if="item.reksip_terbit == true" class="ml-auto d-flex text-danger">
              <div class="pointer mr-2" @click="$router.push(`/rekomendasi/spesialis/edit/${item.id}`)">
                <feather-icon icon="EditIcon" size="20" class="align-middle" />
              </div>
              <!-- <div class="pointer">
                <feather-icon icon="XIcon" size="20" class="align-middle" @click="cancelRecomendation(item.id)" />
              </div> -->
            </div>
          </div>
          <div class="pt-1">
            <div v-if="item.reksip_terbit != true && item.invoice_id == 0" class="card-content card-content-padding"
              style="text-align: justify;">
              <p class="">
                Proses pada pelayanan ini belum selesai.
              </p>
              <p class="p-0 mb-0">
                Silahkan pilih tombol dibawah ini untuk melanjutkan proses atau membatalkannya.
              </p>
              <br>
            </div>
            <div v-else-if="item.reksip_terbit == false && item.invoice_id != 0" class="card-content card-content-padding"
              style="text-align: justify;">
              <p class="">
                Proses pada pelayanan ini belum selesai silahkan menghubungi pihak admin .
              </p>
              <p class="p-0 mb-0">
                untuk melakukan verifikasi invoice anda serta mengaktifkan rekomendasi izin praktek.
              </p>
              <br>
            </div>
            <div v-else class="card-content card-content-padding" style="text-align: justify;">
              <p class="">
                Selamat Rekomendasi Izin Praktik Anda Sudah Terbit.
                <br>
                <br>
                Faskes: {{ item.reksip_nama_instansi }}
                <br>
                Alamat: {{ item.reksip_alamat_instansi }}
              </p>
              <!-- <p class="p-0 mb-0">
                Silahkan lakukan Proses Selanjutnya.
              </p> -->
            </div>
          </div>
          <p v-if="item.invoice_id == 0 || item.reksip_terbit == false">
            <b-button type="submit" variant="outline-danger" block
              @click="$router.push(`/rekomendasi/spesialis/create/${item.id}`)">
              <feather-icon icon="ArrowRightIcon" class="mr-26" />
              <span>Lanjutkan</span></b-button>
            <b-button type="submit" variant="outline-danger" block @click="cancelRecomendation(item.id)">
              <feather-icon icon="XIcon" class="mr-26" />
              <span>Cancel</span>
            </b-button>
          </p>
          <p v-else-if="item.reksip_terbit == true">
            <b-button type="submit" variant="outline-danger" block
              @click="$router.push(`/rekomendasi/spesialis/create/${item.id}`)">
              <feather-icon icon="ArrowRightIcon" class="mr-26" />
              <span>Lihat Invoice</span></b-button>
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import {
  BButton, BCard, BBadge
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'


import apis from '@/api'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    BCard,
    BBadge
  },
  data() {
    return {
      rekomendasi: {
        data: null,
        isLoading: false,
      },
    }
  },
  computed: {
  },
  mounted() {
  },
  created() {
    this.fetchRekomandasi()
  },
  methods: {
    async cancelRecomendation(ids) {
      try {
        this.rekomendasi.isLoading = true
        this.$swal({
          title: 'Apakah kamu yakin?',
          text: 'Rekomendasi Izin Praktik Spesialis yang sudah dihapus, tidak bisa dikembalikan',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        })
          .then(result => {
            if (result.value) {
              this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
              return apis.rekomendasi.cancelRecomendation({ reksip_id: ids })
            }
            return false

          })
          .then(result => {
            if (result) {
              this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: 'Berhasil menghapus rekomendasi izin praktik Spesialis',
                  icon: 'CheckIcon',
                  variant: 'success',
                },
              })
            }
            location.reload()
          })
          .catch(error => {
            this.errorHandler(error, 'gagal di cancel coba lagi')
          })
      } catch (error) {
        this.errorHandler(error, 'kesalahan sistem')
      } finally {
        this.rekomendasi.isLoading = false
      }
    },

    async inputRekomendasi(kategori) {
      try {
        this.rekomendasi.isLoading = true
        await apis.rekomendasi.rekomendasiInput({ reksip_kategori: kategori })
        this.successHandler('berhasil create rekomendasi spesialis')
        location.reload()
      } catch (error) {
        this.errorHandler(error, 'gagal di input')
      } finally {
        this.rekomendasi.isLoading = false
      }
    },

    fetchRekomandasi() {
      this.rekomendasi.isLoading = true
      apis.rekomendasi.getRekomendasi()
        .then(({ data }) => {
          this.rekomendasi.data = data.data
        })
        .finally(() => {
          this.rekomendasi.isLoading = false
        })
    },
  },
}
</script>

<style></style>
