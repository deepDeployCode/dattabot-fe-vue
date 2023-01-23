<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <embed
      :src="pdfUrl"
      type="application/pdf"
      width="100%"
      height="100%"
    >
  </div>
</template>

<script>
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import storage from '@/helpers/storage'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
  },
  data() {
    return {
      pdfUrl: '',
    }
  },
  mounted() {
    this.pdfUrl = storage.getStorage('pdfUrl')
  },
}
</script>

<style>
.embed-pdf {
  height: 100vh !important;
}
</style>
