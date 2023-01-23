<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <b-card
        v-for="item in galery.data"
        :key="item.id"
        class="shadow-none border p-1 mb-1"
        no-body
      >
        <b-embed
          v-if="item.gallery_type === 'Video'"
          type="iframe"
          aspect="16by9"
          :src="getFile(item)"
          autoplay="false"
          autostart="0"
        />
        <b-img
          v-if="item.gallery_type === 'Image'"
          :src="getFile(item)"
          fluid
          center
          style="max-height: 250px;"
        />
        <div class="text-center font-weight-bold mt-1">
          Struktur Organisasi IDI Cabang Jakarta Pusat Masa Bakti 2019 - 2022
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import {
  BCard,
  BImg,
  BEmbed,
} from 'bootstrap-vue'
import apis from '@/api'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BCard,
    BImg,
    BEmbed,
  },
  data() {
    return {
      galery: {
        data: null,
        isLoading: false,
      },
    }
  },
  computed: {
    getFile() {
      return item => {
        if (item.gallery_file) {
          if (!item.gallery_file.includes('https')) {
            return `https://www.idijakpus.or.id/uploads/gallery/gallery_file/${item.id}/${item.gallery_file}`
          }
          return item.gallery_file
        }
        return null
      }
    },
  },
  created() {
    this.fetchGalery()
  },
  methods: {
    fetchGalery() {
      this.galery.isLoading = true
      apis.tentang.getGalery()
        .then(({ data }) => {
          this.galery.data = data.data
        })
        .finally(() => {
          this.galery.isLoading = false
        })
    },
  },
}
</script>

<style>

</style>
