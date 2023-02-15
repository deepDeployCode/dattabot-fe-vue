<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <b-tabs fill>
        <b-tab title="Mutasi Masuk">
          <MutasiMasuk />
        </b-tab>
        <b-tab title="Mutasi Keluar">
          <MutasiKeluar />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>

import {
  BTabs,
  BTab,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import MutasiMasuk from '@/components/Mutasi/MutasiMasuk.vue'
import MutasiKeluar from '@/components/Mutasi/MutasiKeluar.vue'


export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BTabs,
    BTab,
    MutasiMasuk,
    MutasiKeluar,
    // BBadge,
  },
  data() {
    return {
    }
  },
  computed: {
  },
}
</script>

<style>

</style>
