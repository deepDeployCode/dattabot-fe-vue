<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div
        v-if="berkas.isLoading"
        class="d-flex justify-content-center mb-1"
      >
        <b-spinner
          label="Loading..."
          variant="danger"
        />
      </div>
      <div
        v-for="item in berkas.data"
        :key="item.id"
        class="mt-1 border-bottom pb-1 pointer"
        style=" font-size: 1.1rem;"
        @click="viewPdf(getFile(item))"
      >
        {{ item.document_title }}
      </div>
    </div>
  </div>
</template>

<script>
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import {
  BCard,
  BSpinner,
} from 'bootstrap-vue'
import apis from '@/api'
import storage from '@/helpers/storage'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BCard,
    BSpinner,
  },
  data() {
    return {
      berkas: {
        data: null,
        isLoading: false,
      },
    }
  },
  computed: {
    getFile() {
      return item => {
        if (item.document_file) {
          if (!item.document_file.includes('https')) {
            return `https://www.idijakpus.or.id/uploads/document/document_file/${item.id}/${item.document_file}`
          }
          return item.document_file
        }
        return null
      }
    },
  },
  created() {
    this.fetchBerkas()
  },
  methods: {
    fetchBerkas() {
      this.berkas.isLoading = true
      apis.tentang.getBerkas()
        .then(({ data }) => {
          this.berkas.data = data.data
        })
        .finally(() => {
          this.berkas.isLoading = false
        })
    },
    viewPdf(url) {
      storage.setStorage('pdfUrl', url)
      this.$router.push({ path: '/pdfview' })
    },
  },
}
</script>

<style>

</style>
