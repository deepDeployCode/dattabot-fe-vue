<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <b-form
        @submit.prevent
      >
        <quill-editor
          v-model="content"
          :options="snowOption"
        />
        <b-button
          type="submit"
          variant="outline-danger"
          block
          class="mt-1"
          @click="reportForum"
        >
          Kirim
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'

import {
  BForm,
  BButton,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import { quillEditor } from 'vue-quill-editor'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import apis from '@/api'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    quillEditor,
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      content: '',
      snowOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
        theme: 'snow',
        placeholder: 'Silahkan tulis disini ...',
      },
    }
  },
  created() {
  },
  methods: {
    reportForum() {
      if (!this.content) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Konten wajib diisi',
            icon: 'AlertCircleIcon',
            variant: 'danger',
            setTimeout: '5000',
          },
        })
        return
      }
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)

      apis.forum.reportForum(this.$route.params.id, {
        content: this.content,
      })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil melaporkan forum',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ path: '/', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'melaporkan forum gagal, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
