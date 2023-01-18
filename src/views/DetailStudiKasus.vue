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
      <section v-if="!forum.isLoading && !!forum.data">
        <div
          v-for="comment in forum.data.comments"
          :key="comment.id"
          class="d-flex"
        >
          <b-img
            :src="noAvatar"
            height="50"
            width="50"
            rounded="circle"
            class="mr-1"
          />
          <div
            class="flex: 1;"
            style="width: 100%;"
          >
            <b-card
              class="shadow-none border p-1"
              no-body
              style="background-color: #eaeaea; "
            >
              <div
                class="d-flex"
              >
                <div>
                  <div class="font-weight-bold">
                    Louise Kartika Indah
                  </div>
                  <div
                    class="mt-25"
                    v-html="comment.forcomment_content"
                  />
                </div>
                <!-- <div class="ml-auto ">
                  <feather-icon
                    icon="AlertCircleIcon"
                    size="20"
                    stroke-width="2"
                    class="text-danger"
                    @click="isModal = true"
                  />
                </div> -->
              </div>
            </b-card>
          </div>
        </div>
        <div>
          <quill-editor
            v-model="newComment"
            :options="snowOption"
          />
          <b-button
            class="mt-1"
            type="submit"
            variant="outline-danger"
            block
            @click="addComment"
          >
            Kirim
          </b-button>
        </div>
      </section>
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
/* eslint-disable global-require */
import {
  BSpinner,
  BImg,
  BCard,
  BButton,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import CardPost from '@/components/Forum/CardPost.vue'
import { quillEditor } from 'vue-quill-editor'
import apis from '@/api'
import ToastificationContent from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BSpinner,
    CardPost,
    BImg,
    BCard,
    quillEditor,
    BButton,
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
      noAvatar: require('@/assets/images/avatars/no-avatar.png'),
      snowOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
        theme: 'snow',
        placeholder: 'Silahkan tulis komentar disini ...',
      },
      newComment: '',
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
        })
        .catch(() => {})
    },
    addComment() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      apis.forum.addComment(this.$route.params.id, {
        comment: this.newComment,
      })
        .then(() => {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Berhasil menambahkan komentar baru',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.newComment = ''
          this.fetchForum()
        })
        .catch(error => {
          this.errorHandler(error, 'gagal menambahkan komentar, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>
