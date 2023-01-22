<template>
  <div>
    <b-form-group
      label="Nomor Pokok Anggota *"
      label-for="nomor-pokok"
    >
      <validation-provider
        #default="{ errors }"
        name="Nomor Pokok Anggota"
        rules="required"
      >
        <b-form-input
          id="nomor-pokok"
          :state="errors.length > 0 ? false:null"
          name="nomor-pokok"
          type="number"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Nama Lengkap (Sesuai Ijazah) *"
      label-for="nama-lengkap"
    >
      <validation-provider
        #default="{ errors }"
        name="Nama Lengkap (Sesuai Ijazah)"
        rules="required"
      >
        <b-form-input
          id="nama-lengkap"
          :state="errors.length > 0 ? false:null"
          name="nama-lengkap"
          type="text"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Tanggal lahir *"
      label-for="tanggal-lahir"
    >
      <validation-provider
        #default="{ errors }"
        name="Tanggal lahir"
        rules="required"
      >
        <b-form-input
          id="tanggal-lahir"
          :state="errors.length > 0 ? false:null"
          name="tanggal-lahir"
          type="date"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Tempat Lahir *"
      label-for="tempat-lahir"
    >
      <validation-provider
        #default="{ errors }"
        name="Tempat Lahir"
        rules="required"
      >
        <b-form-input
          id="tempat-lahir"
          :state="errors.length > 0 ? false:null"
          name="tempat-lahir"
          type="text"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Nama Universitas (FK Dokter Umum) *"
      label-for="nama-univ"
    >
      <validation-provider
        #default="{ errors }"
        name="Nama Universitas (FK Dokter Umum)"
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
      label="Tahun Masuk Pendidikan Dokter Umum *"
      label-for="tahun-masuk-dr-umum"
    >
      <validation-provider
        #default="{ errors }"
        name="Tahun Masuk Pendidikan Dokter Umum"
        rules="required"
      >
        <b-form-input
          id="tahun-masuk-dr-umum"
          :state="errors.length > 0 ? false:null"
          name="tahun-masuk-dr-umum"
          type="number"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Tahun Lulus Pendidikan Dokter Umum *"
      label-for="tahun-lulus-dr-umum"
    >
      <validation-provider
        #default="{ errors }"
        name="Tahun Lulus Pendidikan Dokter Umum"
        rules="required"
      >
        <b-form-input
          id="tahun-lulus-dr-umum"
          :state="errors.length > 0 ? false:null"
          name="tahun-lulus-dr-umum"
          type="number"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Nomor Telpon *"
      label-for="nomer-telepon"
    >
      <validation-provider
        #default="{ errors }"
        name="Nomor Telpon"
        rules="required"
      >
        <b-form-input
          id="nomer-telepon"
          :state="errors.length > 0 ? false:null"
          name="nomer-telepon"
          type="number"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Email *"
      label-for="email"
    >
      <validation-provider
        #default="{ errors }"
        name="Email"
        rules="required"
      >
        <b-form-input
          id="email"
          :state="errors.length > 0 ? false:null"
          name="email"
          type="email"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Password *"
      label-for="password"
    >
      <validation-provider
        #default="{ errors }"
        name="Password"
        rules="required"
      >
        <b-form-input
          id="password"
          :state="errors.length > 0 ? false:null"
          name="password"
          type="password"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
    <b-form-group
      label="Ketik Ulang Password *"
      label-for="confirm-password"
    >
      <validation-provider
        #default="{ errors }"
        name="Ketik Ulang Password"
        rules="required"
      >
        <b-form-input
          id="confirm-password"
          :state="errors.length > 0 ? false:null"
          name="confirm-password"
          type="password"
        />
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
  </div>
</template>

<script>

import { ValidationProvider } from 'vee-validate'
import {
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import { required, email } from '@validations'

export default {
  components: {
    BFormGroup,
    BFormInput,
    ValidationProvider,
  },
  data() {
    return {
      required, email,
    }
  },
}
</script>

<style>

</style>
