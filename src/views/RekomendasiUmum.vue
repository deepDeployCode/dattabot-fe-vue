<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex flex-row">
        <b-button variant="outline-danger" block @click="$router.push('/rekomendasi/umum/create')">
          Permintaan Baru
        </b-button>
      </div>

      <div class="mt-1" v-for="item in rekomendasi.data" :key="item.id">

        <b-card v-if="item.reksip_kategori != 'spesialis' && item.reksip_kategori != 'Spesialis'"
          class="shadow-none border p-1 mb-1" no-body>
          <div class="d-flex pb-1 border-bottom">
            <div>
              <div class="font-weight-bold"
                v-if="item.reksip_kategori != 'spesialis' && item.reksip_kategori != 'Spesialis'">
                #{{ item.id }} - {{ item.reksip_kategori }}
              </div>
              <!-- label status verif rekom izin praktek-->
              <b-badge v-if="item.reksip_terbit != false" variant="success font-weight–light mt-25">
                Sudah Terbit
              </b-badge>
              <b-badge v-else variant="danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge>
            </div>
            <div class="ml-auto d-flex text-danger">
              <div v-if="item.reksip_terbit != true" class="pointer mr-2"
                @click="$router.push(`/rekomendasi/umum/create/${item.id}`)">
                <feather-icon icon="EditIcon" size="20" class="align-middle" />
              </div>
              <div class="pointer">
                <feather-icon icon="XIcon" size="20" class="align-middle" @click="cancelRecomendation(item.id)" />
              </div>
            </div>
          </div>
          <div class="pt-1">
            <div v-if="item.reksip_terbit != true" class="card-content card-content-padding" style="text-align: justify;">
              <p class="">
                Proses pada pelayanan ini belum selesai.
              </p>
              <p class="p-0 mb-0">
                Silahkan pilih tombol dibawah ini untuk melanjutkan proses atau membatalkannya.
              </p>
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
      currentPage: 1,
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

    refreshPage() {
      if (this.currentPage == 1) {
        this.cancelRecomendation()
      } else {
        this.currentPage = 1
      }
    },

    async cancelRecomendation(ids) {
      try {
        this.rekomendasi.isLoading = true
        await apis.rekomendasi.cancelRecomendation({ reksip_id: ids })
        this.successHandler('berhasil di cancel')
        location.reload()
      } catch (error) {
        this.errorHandler(error, 'gagal di cancel')
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
