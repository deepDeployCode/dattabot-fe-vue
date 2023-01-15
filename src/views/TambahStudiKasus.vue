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
        <b-form-group
          label="Gambar"
          label-for="gambar"
          class="mt-1"
        >
          <b-form-file
            id="gambar"
            v-model="fileGambar"
            accept="image/*"
            @change="onFileChange($event)"
          />
          <div
            v-if="fileGambar"
            class="mt-1"
          >
            <b-img
              height="200"
              width="200"
              class="mt-1"
              fluid
              :src="gambar"
            />
            <b-button
              v-ripple.400="'rgba(40, 199, 111, 0.15)'"
              variant="flat-success"
              class="btn-icon rounded-circle ml-25"
              @click="fileGambar = null, gambar = null"
            >
              <feather-icon
                icon="TrashIcon"
                stroke-width="2"
              />
            </b-button>
          </div>
        </b-form-group>
        <b-button
          type="submit"
          variant="outline-danger"
          block
          @click="tambahStudiKasus"
        >
          Tambah
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
  BFormFile,
  BForm,
  BFormGroup,
  BImg,
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
    BFormFile,
    BForm,
    BFormGroup,
    BImg,
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
        placeholder: 'Silahkan tulis konten studi kasus disini ...',
      },
      gambar: null,
      fileGambar: null,
    }
  },
  created() {
  },
  methods: {
    tambahStudiKasus() {
      if (!this.content) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Konten studi kasus wajib diisi',
            icon: 'AlertCircleIcon',
            variant: 'danger',
            setTimeout: '5000',
          },
        })
        return
      }
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)

      apis.forum.addForum({
        forum_content: this.content,
        forum_image: this.gambar,
      })
        .then(res => {
          console.log(res)
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil menambahkan studi kasus',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ path: '/', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'menambahkan studi kasus gagal, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
    onFileChange(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          this.gambar = result
        })
      }
    },
    createImage(file, cb) {
      const reader = new FileReader()

      reader.onload = e => {
        cb(e.target.result)
      }
      reader.readAsDataURL(file)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
