<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <BaseBottomNavigation />
    <div class="p-2 mx-auto">
      <div v-if="user.isLoading" class="d-flex justify-content-center mb-1">
        <b-spinner label="Loading..." variant="danger" />
      </div>
      <div v-if="!user.isLoading">
        <b-card class="shadow-none border p-1 mb-1" no-body>
          <div class="d-flex">
            <b-img
              fluid
              width="150"
              height="150"
              :src="photoResmi"
              alt="simfoniLogo"
              thumbnail
              rounded="circle" />
            <div class="d-flex pl-1" style="display: flex; align-items: center">
              <div>
                <div class="font-weight-bold" style="font-size: 20px">
                  {{ user.data.orang_nama_lengkap }}
                </div>
                <span class="font-weight-light">
                  {{ user.data.orang_level }}
                </span>
              </div>
            </div>
          </div>
        </b-card>
        <b-card class="shadow-none border mb-1">
          <div
            class="d-flex flex-row justify-content-between align-items-start">
            <div
              class="d-flex flex-column justify-content-center pointer"
              style="width: 25%"
              @click="modalKTA = true">
              <div class="d-flex justify-content-center mb-25">
                <b-img :src="ktaIcon" height="70" width="70" />
              </div>
              <div class="text-center">KTA</div>
            </div>
            <div
              class="d-flex flex-column justify-content-center pointer"
              style="width: 25%"
              @click="$router.push({ path: '/profile/kompetensi' })">
              <div class="d-flex justify-content-center mb-25">
                <b-img :src="kompetensiIcon" height="70" width="70" />
              </div>
              <div class="text-center">Kompetensi</div>
            </div>
            <div
              class="d-flex flex-column justify-content-center pointer"
              style="width: 25%"
              @click="$router.push({ path: '/profile/str' })">
              <div class="d-flex justify-content-center mb-25">
                <b-img :src="strIcon" height="70" width="70" />
              </div>
              <div class="text-center">STR</div>
            </div>
            <div
              class="d-flex flex-column justify-content-center pointer"
              style="width: 25%"
              @click="$router.push({ path: '/profile/pendidikan' })">
              <div class="d-flex justify-content-center mb-25">
                <b-img :src="pendidikanIcon" height="70" width="70" />
              </div>
              <div class="text-center">Pendidikan</div>
            </div>
          </div>
        </b-card>
        <div>
          <div class="font-weight-bold" style="font-size: 16px">Data Diri</div>
          <validation-observer ref="dataDiri">
            <b-form class="mt-1" @submit.prevent>
              <b-form-group label="Status Anggota *" label-for="status-anggota">
                <validation-provider
                  #default="{ errors }"
                  name="Status Anggota"
                  rules="required">
                  <b-form-input
                    id="status-anggota"
                    v-model="user.data.orang_level"
                    :state="errors.length > 0 ? false : null"
                    name="status-anggota"
                    type="text"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Keanggotaan Wilayah *"
                label-for="keanggotaan-wilayah">
                <validation-provider
                  #default="{ errors }"
                  name="Keanggotaan Wilayah"
                  rules="required">
                  <b-form-input
                    id="keanggotaan-wilayah"
                    v-model="user.data.orang_level_wilayah"
                    :state="errors.length > 0 ? false : null"
                    name="keanggotaan-wilayah"
                    type="text"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Nama Lengkap Tanpa Gelar *"
                label-for="nama-lengkap">
                <validation-provider
                  #default="{ errors }"
                  name="Nama Lengkap Tanpa Gelar"
                  rules="required">
                  <b-form-input
                    id="nama-lengkap"
                    v-model="user.data.orang_nama_lengkap"
                    :state="errors.length > 0 ? false : null"
                    name="nama-lengkap"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Gelar Depan" label-for="gelar-depan">
                <validation-provider #default="{ errors }" name="Gelar Depan">
                  <b-form-input
                    id="gelar-depan"
                    v-model="user.data.orang_gelar_depan"
                    :state="errors.length > 0 ? false : null"
                    name="gelar-depan"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Gelar Belakang" label-for="gelar-belakang">
                <validation-provider
                  #default="{ errors }"
                  name="Gelar Belakang">
                  <b-form-input
                    id="gelar-belakang"
                    v-model="user.data.orang_gelar_belakang"
                    :state="errors.length > 0 ? false : null"
                    name="gelar-belakang"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Tempat Lahir *"
                label-for="tempat-lahir"
                rules="required">
                <validation-provider #default="{ errors }" name="Tempat Lahir">
                  <b-form-input
                    id="tempat-lahir"
                    v-model="user.data.orang_tempat_lahir"
                    :state="errors.length > 0 ? false : null"
                    name="tempat-lahir"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Tanggal Lahir *"
                label-for="tanggal-lahir"
                rules="required">
                <validation-provider #default="{ errors }" name="Tanggal Lahir">
                  <b-form-input
                    id="tanggal-lahir"
                    v-model="user.data.orang_tanggal_lahir"
                    :state="errors.length > 0 ? false : null"
                    name="tanggal-lahir"
                    type="date" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Jenis Kelamin" label-for="jenis-kelamin">
                <validation-provider #default="{ errors }" name="Jenis Kelamin">
                  <b-form-select
                    v-model="user.data.orang_jenis_kelamin"
                    :state="errors.length > 0 ? false : null"
                    :options="optionJenisKelamin" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Jenis Kartu Identitas *"
                label-for="jenis-kartu-identitas">
                <validation-provider
                  #default="{ errors }"
                  name="Jenis Kartu Identitas"
                  rules="required">
                  <b-form-input
                    id="jenis-kartu-identitas"
                    v-model="user.data.orang_kartu_id_jenis"
                    :state="errors.length > 0 ? false : null"
                    name="jenis-kartu-identitas"
                    type="text"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Nomor Identitas *"
                label-for="nomor-identitas">
                <validation-provider
                  #default="{ errors }"
                  name="Nomor Identitas"
                  rules="required">
                  <b-form-input
                    id="nomor-identitas"
                    v-model="user.data.orang_kartu_id_nomor"
                    :state="errors.length > 0 ? false : null"
                    name="nomor-identitas"
                    type="text"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Status Pasangan" label-for="status-pasangan">
                <validation-provider
                  #default="{ errors }"
                  name="Status Pasangan">
                  <b-form-select
                    v-model="user.data.orang_pernikahan_status"
                    :state="errors.length > 0 ? false : null"
                    :options="optionStatusPasangan" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Nama Pasangan" label-for="nama-pasangan">
                <validation-provider #default="{ errors }" name="Nama Pasangan">
                  <b-form-input
                    id="nama-pasangan"
                    v-model="user.data.orang_pernikahan_nama_pasangan"
                    :state="errors.length > 0 ? false : null"
                    name="nama-pasangan"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Alamat Tempat Tinggal"
                label-for="alamat-tempat-tinggal">
                <validation-provider
                  #default="{ errors }"
                  name="Alamat Tempat Tinggal">
                  <b-form-input
                    id="alamat-tempat-tinggal"
                    v-model="user.data.orang_alamat_rumah"
                    :state="errors.length > 0 ? false : null"
                    name="alamat-tempat-tinggal"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Telpon" label-for="telpon">
                <validation-provider #default="{ errors }" name="Telpon">
                  <b-form-input
                    id="telpon"
                    v-model="user.data.orang_nomor_telpon"
                    :state="errors.length > 0 ? false : null"
                    name="telpon"
                    type="text" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group
                label="Handphone *"
                label-for="handphone"
                rules="required">
                <validation-provider #default="{ errors }" name="Handphone">
                  <b-form-input
                    id="handphone"
                    v-model="user.data.orang_nomor_hp"
                    :state="errors.length > 0 ? false : null"
                    name="handphone"
                    type="number"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Email *" label-for="email" rules="required">
                <validation-provider #default="{ errors }" name="Email">
                  <b-form-input
                    id="email"
                    v-model="user.data.orang_email"
                    :state="errors.length > 0 ? false : null"
                    name="email"
                    type="email"
                    readonly />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group label="Photo Resmi" label-for="photo-resmi">
                <validation-provider #default="{ errors }" name="Photo Resmi">
                  <b-form-file
                    id="photo-resmi"
                    :state="errors.length > 0 ? false : null"
                    name="photo-resmi"
                    accept="image/*"
                    v-model="upload.photo"
                    @change="onPhotoResmiChange($event)" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-img
                  v-if="photoResmi"
                  fluid
                  center
                  :src="photoResmi"
                  alt="photoResmi"
                  class="mt-1"
                  style="max-height: 250px" />
              </b-form-group>
              <b-form-group label="File Identitas" label-for="file-identitas">
                <validation-provider
                  #default="{ errors }"
                  name="File Identitas">
                  <b-form-file
                    id="file-identitas"
                    :state="errors.length > 0 ? false : null"
                    name="file-identitas"
                    accept="image/*"
                    v-model="upload.fileIdentitas"
                    @change="onPhotoFileIdentitas($event)" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
                <b-img
                  v-if="fileIdentitas"
                  fluid
                  center
                  :src="fileIdentitas"
                  alt="fileIdentitas"
                  class="mt-1"
                  style="max-height: 250px" />
              </b-form-group>
              <b-button
                type="submit"
                variant="outline-danger"
                block
                @click="validationForm">
                Simpan
              </b-button>
            </b-form>
          </validation-observer>
        </div>
        <b-modal
          id="modal-danger"
          v-model="modalKTA"
          modal-class="modal-danger"
          centered
          title="KTA"
          hide-footer>
          <div v-if="user.data.orang_level === 'non-jakpus'">
            <p>
              <b
                >Maaf, anda tidak memiliki KTA. karena belum menjadi anggota IDI
                Jakpus.</b
              >
            </p>
            <b-button
              size="sm"
              class="bg-danger mr-25"
              @click="$router.push({ path: '/mutasi' })">
              Daftar menjadi anggota
            </b-button>
          </div>
          <div v-else>
            <table>
              <tbody>
                <tr>
                  <td>Nomor Pokok Anggota</td>
                  <td class="font-weight-bold">
                    : {{ user.data.orang_npa_idi }}
                  </td>
                </tr>
                <tr>
                  <td>Masa Berlaku</td>
                  <td class="font-weight-bold">: {{ masaBerlaku }}</td>
                </tr>
              </tbody>
            </table>
            <b-img
              fluid
              center
              :src="npaFile"
              alt="photoResmi"
              class="mb-1 mt-1"
              style="max-height: 250px"
              thumbnail />
          </div>
        </b-modal>
      </div>
    </div>
    <DividerNavigation />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BCard,
  BImg,
  BFormGroup,
  BForm,
  BFormInput,
  BFormSelect,
  BButton,
  BSpinner,
  BFormFile,
  BModal,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import BaseBottomNavigation from "@/components/Base/BaseBottomNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import apis from "@/api";
import { required, email } from "@validations";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BaseBottomNavigation,
    BImg,
    BCard,
    ValidationProvider,
    ValidationObserver,
    BFormGroup,
    BForm,
    BFormInput,
    BFormSelect,
    BButton,
    BSpinner,
    BFormFile,
    BModal,
  },
  data() {
    return {
      required,
      email,
      noAvatar: require("@/assets/images/avatars/no-avatar.png"),
      ktaIcon: require("@/assets/images/icons/kta.png"),
      kompetensiIcon: require("@/assets/images/icons/kompetensi.png"),
      strIcon: require("@/assets/images/icons/str.png"),
      pendidikanIcon: require("@/assets/images/icons/pendidikan.png"),

      kripIcon: require("@/assets/images/icons/A3.png"),
      rekomendasiIcon: require("@/assets/images/icons/A1.png"),
      keanggotaanIcon: require("@/assets/images/icons/A2.png"),
      optionJenisKelamin: ["Pria", "Wanita"],
      optionStatusPasangan: [
        {
          value: "Belum Menikah",
          text: "Belum Menikah",
        },
        {
          value: "Sudah Menikah",
          text: "Sudah Menikah",
        },
      ],
      user: {
        data: null,
        isLoading: false,
      },
      upload: {
        photo: null,
        fileIdentitas: null,
      },
      modalKTA: false,
    };
  },
  computed: {
    photoResmi() {
      if (this.user.data && this.user.data?.orang_file_photo_resmi) {
        const img = this.user.data?.orang_file_photo_resmi;
        if (!img.includes("https://") && !img.includes("base64")) {
          return `https://www.staging.idijakpus.or.id/uploads/orang/orang_file_photo_resmi/${this.user.data?.id}/${img}`;
        }
        return img;
      }
      return null;
    },
    fileIdentitas() {
      if (this.user.data && this.user.data?.orang_kartu_id_file) {
        const img = this.user.data?.orang_kartu_id_file;
        if (!img.includes("https") && !img.includes("base64")) {
          return `https://www.staging.idijakpus.or.id/uploads/orang/orang_kartu_id_file/${this.user.data?.id}/${img}`;
        }
        return img;
      }

      return null;
    },
    npaFile() {
      // "https://www.staging.idijakpus.or.id/uploads/orang/orang_npa_file/99/KRIP-Online.jpg"
      if (this.user.data && this.user.data?.orang_npa_file) {
        const img = this.user.data?.orang_npa_file;
        if (!img.includes("https")) {
          return `https://www.staging.idijakpus.or.id/uploads/orang/orang_npa_file/${this.user.data?.id}/${img}`;
        }
        return img;
      }

      return null;
    },
    masaBerlaku() {
      if (!this.user.data) {
        return null;
      }
      return new Date(this.user.data.orang_npa_masa_berlaku).toLocaleDateString(
        "id-ID",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
    },
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user.isLoading = true;
      apis.auth
        .getUser()
        .then(({ data }) => {
          this.user.data = data;
          this.user.isLoading = false;
        })
        .catch(() => {});
    },

    //encode base64 for upload foto resmi
    onPhotoResmiChange(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          console.log(result);
          this.user.data.orang_file_photo_resmi = result;
        });
      }
    },
    createImage(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //encode base 64 for up file identitas
    onPhotoFileIdentitas(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImageIdentitas(files[0], (result) => {
          console.log(result);
          this.user.data.orang_kartu_id_file = result;
        });
      }
    },
    createImageIdentitas(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    validationForm() {
      this.$refs.dataDiri.validate().then((success) => {
        if (success) {
          this.updateProfile();
        }
      });
    },

    updateProfile() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);

      let bodyUpdate = {
        orang_nama_lengkap: this.user.data.orang_nama_lengkap,
        orang_gelar_depan: this.user.data.orang_gelar_depan,
        orang_gelar_belakang: this.user.data.orang_gelar_belakang,
        orang_tempat_lahir: this.user.data.orang_tempat_lahir,
        orang_tanggal_lahir: this.user.data.orang_tanggal_lahir,
        orang_jenis_kelamin: this.user.data.orang_jenis_kelamin,
        orang_pernikahan_status: this.user.data.orang_pernikahan_status,
        orang_pernikahan_nama_pasangan:
          this.user.data.orang_pernikahan_nama_pasangan,
        orang_alamat_rumah: this.user.data.orang_alamat_rumah,
        orang_nomor_telpon: this.user.data.orang_nomor_telpon,
        orang_file_photo_resmi: this.user.data.orang_file_photo_resmi,
        orang_kartu_id_file: this.user.data.orang_kartu_id_file,
      };
      apis.profile
        .updateProfile(this.user.data.id, bodyUpdate)
        .then(({ data }) => {
          this.successHandler(data.message);
        })
        .catch((error) => {
          this.errorHandler(error, "gagal update profile");
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
  },
};
</script>

<style>
.modal-content {
  width: 400px !important;
  margin: auto;
}

@media (max-width: 640px) {
  .modal-content {
    width: 100% !important;
  }
}
</style>
