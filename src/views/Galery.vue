<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div v-if="galery.isLoading" class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading..." variant="danger" />
      </div>
      <b-card
        v-for="item in galery.data"
        :key="item.id"
        class="shadow-none border p-1 mb-1"
        no-body>
        <b-embed
          v-if="item.gallery_type === 'Video'"
          type="iframe"
          aspect="16by9"
          :src="getFile(item)"
          autoplay="false"
          autostart="0" />
        <b-img
          v-if="item.gallery_type === 'Image'"
          :src="getFile(item)"
          fluid
          center
          style="max-height: 250px" />
        <div class="text-center font-weight-bold mt-1">
          {{ item.gallery_title }}
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { BCard, BImg, BEmbed, BSpinner } from "bootstrap-vue";
import apis from "@/api";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BCard,
    BImg,
    BEmbed,
    BSpinner,
  },
  data() {
    return {
      galery: {
        data: null,
        isLoading: false,
      },
    };
  },
  computed: {
    getFile() {
      return (item) => {
        if (item.gallery_file) {
          if (!item.gallery_file.includes("https")) {
            return `https://www.idijakpus.or.id/uploads/gallery/gallery_file/${item.id}/${item.gallery_file}`;
          }
          return item.gallery_file;
        }
        return null;
      };
    },
  },
  created() {
    this.fetchGalery();
  },
  methods: {
    fetchGalery() {
      this.galery.isLoading = true;
      apis.tentang
        .getGalery()
        .then(({ data }) => {
          this.galery.data = data.data;
        })
        .finally(() => {
          this.galery.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
