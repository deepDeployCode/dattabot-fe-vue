<template>
  <b-card
    class="shadow-none border p-1 mb-1"
    no-body
    style="cursor: pointer;"
  >
    <div
      class="d-flex flex-row align-items-center"
      @click="$router.push('/tambah/studi-kasus')"
    >
      <b-img
        :src="noAvatar"
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
</template>

<script>
import {
  BCard,
  BImg,
  BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BImg,
    BFormTextarea,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      noAvatar: require('@/assets/images/avatars/no-avatar.png'),
    }
  },
}
</script>

<style>

</style>
