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
            v-if="gambar"
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
          @click="editStudiKasus"
        >
          Simpan
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
        placeholder: 'Silahkan tulis konten forum disini ...',
      },
      gambar: null,
      fileGambar: null,
    }
  },
  created() {
    this.fetchForum()
  },
  methods: {
    fetchForum() {
      // this.forum.isLoading = true
      apis.forum.getById(this.$route.params.id)
        .then(({ data }) => {
          this.content = data.forum_content
          this.gambar = data.image.forumimg_file
          this.fileGambar = data.image.forumimg_file
        })
        .catch(() => {})
    },
    async editStudiKasus() {
      if (!this.content) {
        this.$toast({
          component: ToastificationContent,
          props: {
            title: 'Konten forum wajib diisi',
            icon: 'AlertCircleIcon',
            variant: 'danger',
            setTimeout: '5000',
          },
        })
        return
      }
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      const form = {
        forum_content: this.content,
        id: this.$route.params.id,
        forum_image: null,
      }
      if (this.gambar) {
        if (this.gambar.includes('base64')) {
          form.forum_image = this.gambar
        } else {
          form.forum_image = await this.generateBase64(this.gambar)
        }
      }
      apis.forum.editForum(form)
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil edit forum',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.$router.push({ path: '/', replace: true })
        })
        .catch(error => {
          this.errorHandler(error, 'edit forum gagal, silahkan coba lagi nanti')
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
    generateBase64(url) {
      return new Promise(res => {
        let canvas = document.createElement('CANVAS')
        const img = document.createElement('img')
        img.src = url
        img.onload = () => {
          canvas.height = img.height
          canvas.width = img.width
          res(canvas.toDataURL('image/png'))
          canvas = null
        }

        img.onerror = () => {
          res(null)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
