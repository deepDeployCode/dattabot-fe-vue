<template>
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
  }
}
</script>

<style>

</style>
