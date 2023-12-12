<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <BaseBottomNavigation />
    <div class="p-2 mx-auto">
      <!-- TODO: ketika di klik, menuju maintenance page -->
      <!-- hide dulu yang ini-->
      <!-- <div>
        <div class="font-weight-bold mb-1" style="font-size: 16px">Webinar</div>
        <div class="p-2 mx-auto">
          <b-card
            v-for="item in forums.webinar.data"
            class="shadow-none border mb-1 pointer mr-1 webinar-card"
            :img-src="item.webijadwal_img"
            @click="$router.push(`/webinar/${item.id}/detail`)">
            <div
              class="mb-25 font-weight-bold"
              @click="$router.push(`/webinar/${item.id}/detail`)">
              {{ item.webijadwal_title }}
            </div>
            <div class="font-weight-light" style="font-size: 12px">
              {{ item.created_at }}
            </div>
          </b-card>
        </div>
      </div> -->
      <b-card class="shadow-none border mb-1">
        <div class="d-flex flex-row center-content-between align-items-start">
          <div
            class="d-flex flex-column center-content-center pointer"
            style="width: 33%"
            @click="$router.push('/pokemon')"
          >
            <div class="d-flex justify-content-center mb-25">
              <b-img :src="rekomendasiIcon" height="70" width="70" />
            </div>
            <div class="text-center">Pokemon Data</div>
          </div>
          <!-- <div
            class="d-flex flex-column justify-content-center"
            style="width: 33%"
            @click="isShowRekomendasi = true">
            <div class="d-flex justify-content-center mb-25">
              <b-img :src="rekomendasiIcon" height="70" width="70" />
            </div>
            <div class="text-center">Rekomendasi SIP</div>
          </div>
          <div
            class="d-flex flex-column justify-content-center"
            style="width: 33%"
            @click="$router.push('/mutasi')">
            <div class="d-flex justify-content-center mb-25">
              <b-img :src="keanggotaanIcon" height="70" width="70" />
            </div>
            <div class="text-center">Keanggotaan</div>
          </div> -->
        </div>
      </b-card>

      <!-- <ButtonCreateNewPost /> -->
      <!-- <div v-if="forums.isLoading" class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading..." variant="danger" />
      </div>
      <div
        v-if="!forums.isLoading && !forums.data.length"
        class="d-flex justify-content-center mb-1"
      >
        Belum ada forum yang di posting
      </div>
      <CardPost
        v-for="forum in forums.data"
        :key="forum.id"
        :forum="forum"
        is-elipsis="true"
        @refreshFetch="fetchForums"
      /> -->
    </div>

    <b-modal
      id="modal-rekomendasi"
      v-model="isShowRekomendasi"
      cancel-variant="secondary"
      centered
      size="xs"
      hide-footer
    >
      <div slot="modal-title">
        <div>Rekomendasi</div>
        <small>Surat Izin Praktik Dokter</small>
      </div>

      <div>
        <b-button
          variant="outline-danger"
          block
          @click="$router.push('/rekomendasi/umum')"
        >
          Umum
        </b-button>
        <b-button
          variant="outline-danger"
          block
          @click="$router.push('/rekomendasi/spesialis')"
        >
          Spesialis
        </b-button>
      </div>
    </b-modal>

    <DividerNavigation />
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BCard, BImg, BSpinner, BModal, BButton } from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import BaseBottomNavigation from "@/components/Base/BaseBottomNavigation.vue";
import CardPost from "@/components/Forum/CardPost.vue";
import BCardCode from "@core/components/b-card-code/BCardCode.vue";
import "swiper/css/swiper.css";
import ButtonCreateNewPost from "@/components/Forum/ButtonCreateNewPost.vue";
import { codePagination } from "./code";

import apis from "@/api";

export default {
  components: {
    BCard,
    BaseNavigation,
    DividerNavigation,
    BImg,
    BaseBottomNavigation,
    BSpinner,
    BCardCode,
    CardPost,
    Swiper,
    SwiperSlide,
    ButtonCreateNewPost,
    BModal,
    BButton,
  },
  data() {
    return {
      codePagination,
      kripIcon: require("@/assets/images/icons/krip.png"),
      rekomendasiIcon: require("@/assets/images/icons/rekomendasi.png"),
      keanggotaanIcon: require("@/assets/images/icons/anggota.png"),
      avatar: require("@/assets/images/avatars/1.png"),
      examplePicStudiKasus: require("@/assets/images/pages/Studi_Kasus_Contoh.jpeg"),
      forums: {
        isLoading: false,
        webinar: {
          isLoading: false,
          data: [],
        },
      },
      isShowRekomendasi: false,
    };
  },
  created() {
    this.fetchForums();
    this.fetchwebinar();
  },
  methods: {
    fetchForums() {
      this.forums.isLoading = true;
      apis.forum
        .getAll()
        .then(({ data }) => {
          this.forums.data = data.data;
          this.forums.isLoading = false;
        })
        .catch(() => {});
    },

    fetchwebinar() {
      this.forums.webinar.isLoading = true;
      apis.webinar.listWebinarEvent().then(({ data }) => {
        this.forums.webinar.data = data.data;
        this.forums.webinar.isLoading = false;
      });
    },

    swiperOptions: {
      pagination: {
        el: ".swiper-pagination",
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.webinar-list {
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  .webinar-card {
    max-width: 33.333%;
    flex-basis: 33.333%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
