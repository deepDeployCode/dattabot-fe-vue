<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <CardPost
        v-if="!forum.isLoading && !!forum.data"
        :forum="forum.data"
      />
      <div
        v-if="forum.isLoading"
        class="d-flex justify-content-center mb-1"
      >
        <b-spinner
          label="Loading..."
          variant="danger"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BSpinner,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import CardPost from '@/components/Forum/CardPost.vue'

import apis from '@/api'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BSpinner,
    CardPost,
  },
  data() {
    return {
      kripIcon: require('@/assets/images/icons/icon-stethoscope.png'),
      rekomendasiIcon: require('@/assets/images/icons/icon-documents.png'),
      keanggotaanIcon: require('@/assets/images/icons/icon-idcard.png'),
      avatar: require('@/assets/images/avatars/1.png'),
      examplePicStudiKasus: require('@/assets/images/pages/Studi_Kasus_Contoh.jpeg'),
      forum: {
        isLoading: false,
        data: null,
      },
    }
  },
  created() {
    this.fetchForum()
  },
  methods: {
    fetchForum() {
      this.forum.isLoading = true
      apis.forum.getById(this.$route.params.id)
        .then(({ data }) => {
          this.forum.data = data
          this.forum.isLoading = false
          console.log(this.forum.data)
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
