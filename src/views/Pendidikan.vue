<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <app-collapse class="p-0">

        <app-collapse-item
          title="Tambah Pendidikan"
          class="shadow-none p-0"
          :is-visible="isTambahPendidikan"
          @visible="changeVisible"
        >
          <validation-observer ref="formPendidikan">
            <b-form
              class="mt-1"
              @submit.prevent
            >
              <b-form-group
                label="Negara Asal Universitas *"
                label-for="negara-asal-univ"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Negara Asal Universitas"
                  rules="required"
                >
                  <b-form-input
                    id="negara-asal-univ"
                    v-model="form.pend_negara"
                    :state="errors.length > 0 ? false:null"
                    name="negara-asal-univ"
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Nama Universitas *"
                label-for="nama-univ"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nama Universitas"
                  rules="required"
                >
                  <b-form-input
                    id="nama-univ"
                    v-model="form.pend_nama_univ"
                    :state="errors.length > 0 ? false:null"
                    name="nama-univ"
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Jenjang Pendidikan *"
                label-for="jenjang-pendidikan"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Jenjang Pendidikan"
                >
                  <b-form-select
                    v-model="form.pendlevel_id"
                    :state="errors.length > 0 ? false:null"
                    :options="optionJenjangPendidikan"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Nama Studi *"
                label-for="nama-studi"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nama Studi"
                  rules="required"
                >
                  <b-form-input
                    id="nama-studi"
                    v-model="form.pend_nama_studi"
                    :state="errors.length > 0 ? false:null"
                    name="nama-studi"
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Tahun Masuk *"
                label-for="tahun-masuk"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Tahun Masuk"
                  rules="required"
                >
                  <b-form-input
                    id="tahun-masuk"
                    v-model="form.pend_thn_masuk"
                    :state="errors.length > 0 ? false:null"
                    name="tahun-masuk"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Tahun Selesai *"
                label-for="tahun-selesai"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Tahun Selesai"
                  rules="required"
                >
                  <b-form-input
                    id="tahun-selesai"
                    v-model="form.pend_thn_keluar"
                    :state="errors.length > 0 ? false:null"
                    name="tahun-selesai"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Nomor Ijazah *"
                label-for="nomor-ijazah"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nomor Ijazah"
                  rules="required"
                >
                  <b-form-input
                    id="nomor-ijazah"
                    v-model="form.pend_nomor_ijazah"
                    :state="errors.length > 0 ? false:null"
                    name="nomor-ijazah"
                    type="number"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="File Ijazah"
                label-for="file"
              >
                <validation-provider
                  #default="{ errors }"
                  name="File Ijazah"
                >
                  <b-form-file
                    id="file"
                    v-model="tempFileKompetensi"
                    :state="errors.length > 0 ? false:null"
                    name="file"
                    accept="image/*"
                    @change="onChangeFileKompetensi($event)"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-img
                  v-if="form.pend_ijazah_file"
                  fluid
                  center
                  :src="form.pend_ijazah_file"
                  alt="fileKompetensi"
                  class="mt-1"
                  style="max-height: 250px;"
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
        style="font-size: 16px;"
      >
        Daftar Pendidikan
      </div>
      <b-card
        v-for="item in pendidikan.data"
        :key="item.id"
        class="shadow-none border p-1 mb-1"
        no-body
      >

        <table>
          <tbody>
            <tr>
              <td>Negara</td>
              <td class="font-weight-bold">
                : {{ item.pend_negara }}
              </td>
            </tr>
            <tr>
              <td>Nama Universitas</td>
              <td class="font-weight-bold">
                : {{ item.pend_nama_univ }}
              </td>
            </tr>
            <tr>
              <td>Studi</td>
              <td class="font-weight-bold">
                : {{ item.pend_nama_studi }}
              </td>
            </tr>
            <tr>
              <td>Nomor Ijazah</td>
              <td class="font-weight-bold">
                : {{ item.pend_nomor_ijazah }}
              </td>
            </tr>
            <tr>
              <td>Tahun</td>
              <td class="font-weight-bold">
                : {{ item.pend_thn_masuk }} - {{ item.pend_thn_keluar }}
              </td>
            </tr>
          </tbody>
        </table>
        <b-img
          :src="photoIjazah(item)"
          fluid
          center
          class="mt-1"
          style="max-height: 250px;"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BImg,
  BFormFile,
  BForm,
  BFormGroup,
  BButton,
  BFormInput,
  BFormSelect,
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
    BFormSelect,
  },
  data() {
    return {
      required,
      email,
      fileKompetensi: '',
      tempFileKompetensi: null,
      optionJenjangPendidikan: [
        { value: 1, text: 'Sarjana Kedokteran / S1' },
        { value: 2, text: 'Dokter Umum' },
        { value: 3, text: 'Master / S2' },
        { value: 4, text: 'Dokter Spesialis' },
        { value: 5, text: 'Doktoral / S3' },
        { value: 6, text: 'Dokter Sub Spesialis' },
      ],
      pendidikan: {
        isLoading: false,
        data: [],
      },
      form: {
        pend_negara: '',
        pend_nama_univ: '',
        pendlevel_id: '',
        pend_nama_studi: '',
        pend_thn_masuk: '',
        pend_thn_keluar: '',
        pend_nomor_ijazah: '',
        pend_ijazah_file: '',
      },
      isTambahPendidikan: false,
    }
  },
  computed: {
    photoIjazah() {
      return item => {
        if (item.pend_ijazah_file) {
          if (!item.pend_ijazah_file.includes('https')) {
            return `https://www.staging.idijakpus.or.id/uploads/pend/pend_ijazah_file/${item.id}/${item.pend_ijazah_file}`
          }
          return item.pend_ijazah_file
        }
        return null
      }
    },
  },
  created() {
    this.fetchPendidikan()
  },
  methods: {
    changeVisible(payload) {
      this.isTambahPendidikan = payload
    },
    fetchPendidikan() {
      this.pendidikan.isLoading = true
      apis.profile
        .getPendidikan()
        .then(({ data }) => {
          if (data.data.length) {
            this.pendidikan.data = data.data
          }
        })
        .finally(() => {
          this.pendidikan.isLoading = false
        })
    },
    onChangeFileKompetensi(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          this.form.pend_ijazah_file = result
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
        .createPendidikan({
          ...this.form,
        })
        .then(() => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: 'Berhasil menambahkan Pendidikan',
              icon: 'CheckIcon',
              variant: 'success',
            },
          })
          this.fetchPendidikan()
          this.form = {
            pend_negara: '',
            pend_nama_univ: '',
            pendlevel_id: '',
            pend_nama_studi: '',
            pend_thn_masuk: '',
            pend_thn_keluar: '',
            pend_nomor_ijazah: '',
            pend_ijazah_file: '',
          }
          this.tempFileKompetensi = ''
          this.isTambahPendidikan = false
        })
        .catch(error => {
          this.errorHandler(error, 'Gagal menambahkan Pendidikan, silahkan coba lagi nanti')
        })
        .finally(() => {
          this.$store.commit('app/UPDATE_LOADING_BLOCK', false)
        })
    },
  },
}
</script>

<style>

</style>
