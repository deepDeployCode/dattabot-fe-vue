<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <BaseBottomNavigation />
    <div class="p-2 mx-auto">
      <b-card
        class="shadow-none border mb-1"
      >
        <div class="d-flex flex-row justify-content-between align-items-start">
          <div
            class="d-flex flex-column justify-content-center"
            style="width: 33%;"
          >
            <div class="d-flex justify-content-center mb-25">
              <b-img
                :src="kripIcon"
                height="50"
                width="50"
              />
            </div>
            <div class="text-center">
              Pembekalan KRIP
            </div>
          </div>
          <div
            class="d-flex flex-column justify-content-center"
            style="width: 33%;"
          >
            <div class="d-flex justify-content-center mb-25">
              <b-img
                :src="rekomendasiIcon"
                height="50"
                width="50"
              />
            </div>
            <div class="text-center">
              Rekomendasi
            </div>
          </div>
          <div
            class="d-flex flex-column justify-content-center"
            style="width: 33%;"
          >
            <div class="d-flex justify-content-center mb-25">
              <b-img
                :src="keanggotaanIcon"
                height="50"
                width="50"
              />
            </div>
            <div class="text-center">
              Keanggotaan
            </div>
          </div>
        </div>
      </b-card>
      <ButtonCreateNewPost />
      <div
        v-if="forums.isLoading"
        class="d-flex justify-content-center mb-1"
      >
        <b-spinner
          label="Loading..."
          variant="danger"
        />
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
      />
      <div>
        <div
          class="font-weight-bold mb-1"
          style="font-size: 16px;"
        >
          Webinar
        </div>
        <div
          class="webinar-list"
        >
          <b-card
            class="shadow-none border mb-1 pointer mr-1 webinar-card"
            img-src="https://picsum.photos/600/300/?image=25"
          >
            <div class="mb-25 font-weight-bold">
              Temu SIMFONI IDI JakPus
            </div>
            <div
              class="font-weight-light"
              style="font-size: 12px;"
            >
              08/12/2022
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <DividerNavigation />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BCard,
  BImg,
  BSpinner,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import BaseBottomNavigation from '@/components/Base/BaseBottomNavigation.vue'
import CardPost from '@/components/Forum/CardPost.vue'
import ButtonCreateNewPost from '@/components/Forum/ButtonCreateNewPost.vue'

import apis from '@/api'

export default {
  components: {
    BCard,
    BaseNavigation,
    DividerNavigation,
    BImg,
    BaseBottomNavigation,
    BSpinner,
    CardPost,
    ButtonCreateNewPost,
  },
  data() {
    return {
      kripIcon: require('@/assets/images/icons/icon-stethoscope.png'),
      rekomendasiIcon: require('@/assets/images/icons/icon-documents.png'),
      keanggotaanIcon: require('@/assets/images/icons/icon-idcard.png'),
      avatar: require('@/assets/images/avatars/1.png'),
      examplePicStudiKasus: require('@/assets/images/pages/Studi_Kasus_Contoh.jpeg'),
      forums: {
        isLoading: false,
        data: [],
      },
    }
  },
  created() {
    this.fetchForums()
  },
  methods: {
    fetchForums() {
      this.forums.isLoading = true
      apis.forum.getAll()
        .then(({ data }) => {
          this.forums.data = data.data
          this.forums.isLoading = false
        })
        .catch(() => {})
    },
  },
}
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
