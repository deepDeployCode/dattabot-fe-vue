<!-- eslint-disable vue/no-v-html -->
<template>
  <b-card
    class="shadow-none border p-1 mb-1"
    no-body
  >
    <div class="d-flex pb-1 border-bottom">
      <b-img
        :src="noAvatar"
        height="50"
        width="50"
        rounded="circle"
        class="mr-1"
      />
      <div>
        <div class="font-weight-bold">
          {{ forum.orang.orang_nama_lengkap }}
        </div>
        <span
          class="font-weight-light"
          style="font-size: 10px;"
        >
          {{ new Date(forum.updated_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) }} WIB</span>
      </div>
      <div class="ml-auto ">
        <b-dropdown
          id="dropdown-grouped"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="flat-danger"
          right
          class="dropdown-icon-wrapper"
          size="sm"
        >
          <template #button-content>
            <feather-icon
              icon="MoreHorizontalIcon"
              size="16"
              class="align-middle"
            />
          </template>
          <b-dropdown-item
            v-if="isOwnerForum"
            @click="$router.push(`/forum/edit/${forum.id}`)"
          >
            Edit
          </b-dropdown-item>
          <b-dropdown-item
            v-if="!isOwnerForum"
            @click="$router.push(`/forum/report/${forum.id}`)"
          >
            Laporkan
          </b-dropdown-item>
        </b-dropdown>
        <!-- <feather-icon
          icon="MoreHorizontalIcon"
          size="22"
          stroke-width="2"
          class="text-danger"
        /> -->
      </div>
    </div>
    <div class="pb-1 border-bottom pt-1">
      <b-img
        v-if="imgContent"
        :src="imgContent"
        fluid
        class="mb-25"
      />
      <div>
        <span
          :class="isElipsis ? 'elipsis-content' : ''"
          v-html="forum.forum_content"
        /><span
          v-if="isElipsis"
          class="font-weight-bold text-primary"
          style="cursor:pointer"
          @click="$router.push(`/studi-kasus/${forum.id}`)"
        > Lanjut baca</span>
      </div>
    </div>
    <div class="pt-1 d-flex justify-content-around">
      <div>
        <feather-icon
          :badge="forum.likes_count"
          badge-classes="bg-danger"
          icon="ThumbsUpIcon"
          size="20"
        />
      </div>
      <div>
        <feather-icon
          :badge="forum.comments_count"
          badge-classes="bg-danger"
          icon="MessageSquareIcon"
          size="20"
        />
      </div>
    </div>
  </b-card>
</template>

<script>
/* eslint-disable global-require */
import {
  BCard,
  BImg,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { getUserDataFromStorage } from '@/helpers/getDataFromStorage'

export default {
  components: {
    BCard,
    BImg,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    Ripple,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['forum', 'isElipsis'],
  data() {
    return {
      examplePicStudiKasus: require('@/assets/images/pages/Studi_Kasus_Contoh.jpeg'),
      noAvatar: require('@/assets/images/avatars/no-avatar.png'),
    }
  },
  computed: {
    imgContent() {
      const img = this.forum?.image?.forumimg_file || ''
      if (!!img && !img.includes('https')) {
        const id = this.forum?.image?.id
        return `https://www.idijakpus.or.id/uploads/forumimg/forumimg_file/${id}/${img}`
      }

      return img
    },
    isOwnerForum() {
      return getUserDataFromStorage()?.userId === this.forum?.orang?.id
    },
  },
}
</script>

<style scoped>
   .elipsis-content {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
