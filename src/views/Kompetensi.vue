<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <app-collapse class="p-0">

        <app-collapse-item
          title="Tambah Kompetensi"
          class="shadow-none p-0"
        >
          <validation-observer ref="formKompetensi">
            <b-form
              class="mt-1"
              @submit.prevent
            >
              <b-form-group
                label="Nomor Sertifikat Kompetensi *"
                label-for="nomor-sertif"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nomor Sertifikat Kompetensi"
                  rules="required"
                >
                  <b-form-input
                    id="nomor-sertif"
                    :state="errors.length > 0 ? false:null"
                    name="nomor-sertif"
                    type="text"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Jenis Kompetensi *"
                label-for="jenis-kompetensi"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Jenis Kompetensi"
                  rules="required"
                >
                  <b-form-input
                    id="jenis-kompetensi"
                    :state="errors.length > 0 ? false:null"
                    name="jenis-kompetensi"
                    type="text"
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
                    :state="errors.length > 0 ? false:null"
                    name="file"
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
        Daftar Kompetensi
      </div>
      <b-card
        class="shadow-none border p-1 mb-1"
        no-body
      >
        <table>
          <tbody>
            <tr>
              <td>Jenis Kompetensi</td>
              <td class="font-weight-bold">
                : DUUUUU
              </td>
            </tr>
            <tr>
              <td>Nomor Sertifikat</td>
              <td class="font-weight-bold">
                : 1234343
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
  },
  data() {
    return {
      required,
      email,
      fileKompetensi: '',
      tempFileKompetensi: null,
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
