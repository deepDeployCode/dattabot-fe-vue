<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <app-collapse class="p-0">

        <app-collapse-item
          title="Tambah Pendidikan"
          class="shadow-none p-0"
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
                  v-if="fileKompetensi"
                  fluid
                  center
                  :src="fileKompetensi"
                  alt="fileKompetensi"
                  class="mt-1"
                  style="max-height: 250px;"
                />
              </b-form-group>
              <b-button
                type="submit"
                variant="outline-danger"
                block
                disabled
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
        class="shadow-none border p-1 mb-1"
        no-body
      >

        <table>
          <tbody>
            <tr>
              <td>Negara</td>
              <td class="font-weight-bold">
                : Indonesia
              </td>
            </tr>
            <tr>
              <td>Nama Universitas</td>
              <td class="font-weight-bold">
                : FK
              </td>
            </tr>
            <tr>
              <td>Studi</td>
              <td class="font-weight-bold">
                : Umum
              </td>
            </tr>
            <tr>
              <td>Nomor Ijazah</td>
              <td class="font-weight-bold">
                : 215364164
              </td>
            </tr>
            <tr>
              <td>Tahun</td>
              <td class="font-weight-bold">
                : 1999 - 2005
              </td>
            </tr>
          </tbody>
        </table>
        <b-img
          src="https://www.idijakpus.or.id/uploads/kompetensi/kompetensi_file/2038/SAVE_20220806_205520.jpg"
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
    }
  },
  methods: {
    onChangeFileKompetensi(e) {
      const { files } = e.target
      if (files.length) {
        this.createImage(files[0], result => {
          console.log(result)
          this.fileKompetensi = result
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

<style>

</style>
