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
      <b-card
        class="shadow-none border p-1 mb-1"
        no-body
        style="cursor: pointer;"
      >
        <div class="d-flex flex-row align-items-center">
          <b-img
            :src="avatar"
            height="50"
            width="50"
            rounded="circle"
            class="mr-1"
          />
          <b-form-textarea
            placeholder="Tulis studi kasus"
            rows="1"
            no-resize
            disabled
            class="bg-white border"
            style="cursor:pointer;"
          />
        </div>
      </b-card>
      <b-card
        class="shadow-none border p-1 mb-1"
        no-body
      >
        <div class="d-flex pb-1 border-bottom">
          <b-img
            :src="avatar"
            height="50"
            width="50"
            rounded="circle"
            class="mr-1"
          />
          <div>
            <div class="font-weight-bold">
              Admin simfoni
            </div>
            <span
              class="font-weight-light"
              style="font-size: 10px;"
            >13/01/2023 13:23</span>
          </div>
          <div class="ml-auto ">
            <feather-icon
              icon="MoreHorizontalIcon"
              size="22"
              stroke-width="2"
              class="text-danger"
            />
          </div>
        </div>
        <div class="pb-1 border-bottom pt-1">
          <b-img
            :src="examplePicStudiKasus"
            fluid
            class="mb-25"
          />
          <div>
            Chief Complaint Increasing shortness of breath with cough and wheezing History and Physical Examination A 24-year-old woman comes to emergency department during wintertime with severe shortness of breath for 2 to 3 days. Her family states that she has a hi... <span
              class="font-weight-bold text-primary"
              style="cursor:pointer"
            >Lanjut baca</span>
          </div>
        </div>
        <div class="pt-1 d-flex justify-content-around">
          <div>
            <feather-icon
              badge="3"
              badge-classes="bg-danger"
              icon="ThumbsUpIcon"
              size="20"
            />
          </div>
          <div>
            <feather-icon
              badge="3"
              badge-classes="bg-danger"
              icon="MessageSquareIcon"
              size="20"
            />
          </div>
        </div>
      </b-card>
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
  BFormTextarea,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import BaseBottomNavigation from '@/components/Base/BaseBottomNavigation.vue'

export default {
  components: {
    BCard,
    BaseNavigation,
    DividerNavigation,
    BImg,
    BFormTextarea,
    BaseBottomNavigation,
  },
  data() {
    return {
      kripIcon: require('@/assets/images/icons/icon-stethoscope.png'),
      rekomendasiIcon: require('@/assets/images/icons/icon-documents.png'),
      keanggotaanIcon: require('@/assets/images/icons/icon-idcard.png'),
      avatar: require('@/assets/images/avatars/1.png'),
      examplePicStudiKasus: require('@/assets/images/pages/Studi_Kasus_Contoh.jpeg'),
    }
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
