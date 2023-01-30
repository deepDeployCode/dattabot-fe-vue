<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <BaseBottomNavigation />
    <div class="p-2 mx-auto">
      <ButtonCreateNewPost />
      <CardPost
        v-for="forum in forums.data"
        :key="forum.id"
        :forum="forum"
        is-elipsis="true"
        @refreshFetch="fetchForums"
      />
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
    </div>
    <DividerNavigation />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
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
    BaseNavigation,
    DividerNavigation,
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
        nextPageUrl: null,
      },
    }
  },
  mounted() {
    document.getElementsByClassName('app-wrapper')[0].addEventListener('scroll', this.scrollCallback)
  },
  created() {
    this.fetchForums()
  },
  methods: {
    scrollCallback() {
      const element = document.getElementsByClassName('app-wrapper')[0]
      const { scrollTop } = element
      const { scrollHeight } = element
      const { clientHeight } = element
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        if (!this.forums.isLoading && this.forums.nextPageUrl) {
          this.fetchForums(this.forums.nextPageUrl)
        }
      }
    },
    refreshFetch() {
      this.forums.nextPageUrl = null
      this.fetchForums()
    },
    fetchForums(url) {
      // TODO: set pagination scrollable
      this.forums.isLoading = true
      apis.forum.getAll(url)
        .then(({ data }) => {
          if (url) {
            this.forums.data = this.forums.data.concat(data.data)
          } else {
            this.forums.data = data.data
          }
          this.forums.isLoading = false
          this.forums.nextPageUrl = data.next_page_url
        })
        .catch(() => {})
    },
  },
}
</script>
