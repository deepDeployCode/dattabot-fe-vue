<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <app-collapse class="p-0">
        <app-collapse-item
          :is-visible="isTambahStr"
          title="Tambah STR"
          class="shadow-none p-0"
          @visible="changeVisible"
        >
          <validation-observer ref="formSTR">
            <b-form
              class="mt-1"
              @submit.prevent
            >
              <b-form-group
                label="Nomor STR *"
                label-for="nomor-str"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nomor STR"
                  rules="required"
                >
                  <b-form-input
                    id="nomor-str"
                    v-model="form.str_no"
                    :state="errors.length > 0 ? false : null"
                    name="nomor-str"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Tanggal Berakhir *"
                label-for="tanggal-berakhir"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Tanggal Berakhir"
                  rules="required"
                >
                  <b-form-input
                    id="tanggal-berakhir"
                    v-model="form.str_tgl_berakhir"
                    :state="errors.length > 0 ? false : null"
                    name="tanggal-berakhir"
                    type="date"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="File"
                label-for="file"
              >
                <validation-provider
                  #default="{ errors }"
                  name="File"
                >
                  <b-form-file
                    id="file"
                    v-model="tempFileKompetensi"
                    :state="errors.length > 0 ? false : null"
                    name="file"
                    accept="image/*"
                    @change="onChangeFileKompetensi($event)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-img
                  v-if="form.str_file"
                  fluid
                  center
                  :src="form.str_file"
                  alt="fileKompetensi"
                  class="mt-1"
                  style="max-height: 250px"
                />
              </b-form-group>
              <b-button
                type="submit"
                variant="outline-danger"
                block
                @click="submit"
              >
                Simpan
              </b-button>
            </b-form>
          </validation-observer>
        </app-collapse-item>
      </app-collapse>
      <hr>
      <div
        class="font-weight-bold mb-1"
        style="font-size: 16px"
      >
        Daftar STR
      </div>
      <b-card
        v-for="item in str.data"
        :key="item.id"
        class="shadow-none border p-1 mb-1"
        no-body
      >
        <table>
          <tbody>
            <tr>
              <td>ID STR</td>
              <td class="font-weight-bold">
                : #{{ item.id }}
              </td>
            </tr>
            <tr>
              <td>Nomor STR</td>
              <td class="font-weight-bold">
                : {{ item.str_no ? item.str_no : '-' }}
              </td>
            </tr>
            <tr>
              <td>Masa Berlaku</td>
              <td class="font-weight-bold">
                :
                {{
                  item.str_tgl_berakhir
                    ? new Date(item.str_tgl_berakhir).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })
                    : '-'
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <b-img
          :src="photoStr(item)"
          fluid
          center
          class="mt-1"
          style="max-height: 250px"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard, BImg, BFormFile, BForm, BFormGroup, BButton, BFormInput,
} from 'bootstrap-vue'
import BaseNavigation from '@/components/Base/BaseNavigation.vue'
import DividerNavigation from '@/components/Base/DividerNavigation.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import { required, email } from '@validations'
import apis from '@/api'
import ToastificationContentVue from '@/@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BCard,
    BImg,
    BFormFile,
    BForm,
    BFormGroup,
    BButton,
    BFormInput,
    ValidationProvider,
    ValidationObserver,
    AppCollapse,
    AppCollapseItem,
  },
  data() {
    return {
      required,
      email,
      fileKompetensi: '',
      tempFileKompetensi: null,
      str: {
        isLoading: false,
        data: [],
      },
      form: {
        str_no: '',
        str_tgl_berakhir: '',
        str_file: '',
      },
      isTambahStr: false,
    }
  },
  // https://www.staging.idijakpus.or.id/uploads/str/str_file/56/.Pic.jpg
  computed: {
    photoStr() {
      return item => {
        if (item.str_file) {
          if (!item.str_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/str/str_file/${item.id}/${item.str_file}`
          }
          return item.str_file
        }
        return null
      }
    },
  },
  created() {
    this.fetchStr()
  },
  methods: {
    changeVisible(payload) {
      console.log(payload)
      this.isTambahStr = payload
    },
    fetchStr() {
      this.str.isLoading = true
      apis.profile
        .getStr()
        .then(({ data }) => {
          if (data.data.length) {
            this.str.data = data.data
          }
        })
        .finally(() => {
          this.str.isLoading = false
        })
    },
    onChangeFileKompetensi(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          this.form.str_file = result
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
    submit() {
      this.$store.commit('app/UPDATE_LOADING_BLOCK', true)
      apis.profile
        .createStr({
          ...this.form,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Berhasil menambahkan STR',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.fetchStr()
          this.form = {
            str_no: '',
            str_tgl_berakhir: '',
            str_file: '',
          }
          this.tempFileKompetensi = ''
          this.isTambahStr = false
        })
        .catch(error => {
          this.errorHandler(error, 'Gagal menambahkan STR, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>

<style></style>
