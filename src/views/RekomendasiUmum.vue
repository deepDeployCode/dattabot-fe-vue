<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex flex-row">
        <b-button
          variant="outline-danger"
          block
          @click="$router.push('/rekomendasi/umum/create')"
        >
          Permintaan Baru
        </b-button>
      </div>

      <div class="mt-1">

        <b-card
          class="shadow-none border p-1 mb-1"
          no-body
        >
          <div class="d-flex pb-1 border-bottom">
            <div>
              <div class="font-weight-bold">
                #234324 - UMUM
              </div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div
              class="ml-auto pointer text-danger"
            >
              <feather-icon
                icon="TrashIcon"
                size="16"
                class="align-middle"
              />
            </div>
          </div>
          <div class="pt-1">
            <div
              class="card-content card-content-padding"
              style="text-align: justify;"
            >
              <p class="">
                Proses pada pelayanan ini belum selesai.
              </p>
              <p class="p-0 mb-0">
                Silahkan pilih tombol dibawah ini untuk melanjutkan proses atau membatalkannya.
              </p>
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
  BButton, BCard,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'

// import apis from '@/api'
export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    BCard,
  },
  data() {
    return {
    }
  },
  computed: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
  },
}
</script>

<style>

</style>
