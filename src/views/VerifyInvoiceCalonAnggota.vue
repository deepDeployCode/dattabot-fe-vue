<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div
      v-if="
        invoices.data.invoice.reginvoice_status === 'belum-dibayar' ||
        invoices.data.invoice.reginvoice_status === 'belum-bayar'
      "
      class="p-2 mx-auto">
      <validation-observer
        v-if="invoices.data && !invoices.isLoading"
        ref="buktiBayarValidation">
        <b-form class="mt-1" @submit.prevent>
          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">
                  Invoice: # {{ invoices.data.invoice.id }}
                  <br />
                  IdRekomendasi: # {{ invoices.data.user.id }}
                </div>
                <small>
                  {{ invoices.data.invoice.created_at }}
                </small>
                <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
              </div>
            </div>

            <div class="text-center pt-1">
              <div style="font-size: 24px">
                <b>Rp {{ invoices.data.invoice.reginvoice_jumlah }}</b>
              </div>
              <div class="border-1">
                <span>{{ invoices.data.invoice.reginvoice_status }}</span>
              </div>
              <br />
              <!-- card 1 -->
              <b-card
                v-if="
                  invoices.data.invoice.reginvoice_status === 'sudah-dibayar' ||
                  invoices.data.invoice.reginvoice_status === 'sudah-bayar'
                "
                img-alt="Card image cap"
                img-top
                no-body>
                <b-card-body>
                  <b-card-text>
                    selanjutnya lakukan pengaktifan akun simfoni anda dengan
                    cara menghubungi pihak admin.
                  </b-card-text>
                </b-card-body>
                <b-card-footer>
                  <small class="text-muted"
                    ><i
                      >Noted: jika akun anda sudah aktif maka anda dapat login
                      di aplikasi simfoni</i
                    ></small
                  >
                </b-card-footer>
              </b-card>
              <b-card v-else img-alt="Card image cap" img-top no-body>
                <b-card-footer>
                  <small class="text-muted"
                    ><i
                      >Noted: harap hubungi pihak admin agar mempercepat proses
                      aktivasi akun anda</i
                    ></small
                  >
                </b-card-footer>
              </b-card>
            </div>
          </b-card>
          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">Informasi Pembayaran</div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr>
                  <td>Bank</td>
                  <td class="font-weight-bold">: Bank Syariah Indonesia</td>
                </tr>
                <tr>
                  <td>Akun</td>
                  <td class="font-weight-bold">: IDI JAKPUS</td>
                </tr>
                <tr>
                  <td>Rekening</td>
                  <td class="font-weight-bold">: 7132822063</td>
                </tr>
                <tr>
                  <td>Keterangan</td>
                  <td class="font-weight-bold">
                    : {{ invoices.data.invoice.reginvoice_nama }}
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-form-group
            label="Upload Bukti Bayar *"
            label-for="upload-bukti-bayar"
            class="mt-1">
            <validation-provider
              #default="{ errors }"
              name="upload-bukti-bayar"
              rules="required">
              <b-form-file
                id="upload-bukti-bayar"
                :state="errors.length > 0 ? false : null"
                v-model="tempBuktiBayar"
                accept="image/*"
                @change="buktiBayar($event)" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <b-card class="shadow-none border p-1 mb-1" no-body>
            <div class="d-flex pb-1 border-bottom">
              <div>
                <div class="font-weight-bold">Bukti Pembayaran</div>
              </div>
            </div>
            <table class="mt-1">
              <tbody>
                <tr v-if="invoices.data.invoice.reginvoice_file != null">
                  <td>
                    <img
                      :src="invoices.data.invoice.reginvoice_file"
                      alt="gallery_image"
                      width="320"
                      height="280" />
                  </td>
                </tr>
                <tr v-else>
                  <p>belum ada bukti screenshoot</p>
                </tr>
              </tbody>
            </table>
          </b-card>

          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validateUploadBuktiBayar">
            Simpan
          </b-button>
        </b-form>
      </validation-observer>
    </div>
    <div v-else class="p-2 mx-auto">
      <validation-observer
        v-if="invoices.data && !invoices.isLoading"
        ref="lengkapiDataCalonAnggota">
        <app-collapse class="p-0">
          <app-collapse-item
            :is-visible="visible.dataDiri"
            title="Data Diri"
            class="shadow-none p-0"
            @visible="changeVisibleDataDiri">
            <br />
            <!-- form submit data diri-->
            <b-form-group label="Id" label-for="id">
              <validation-provider
                #default="{ errors }"
                name="Id"
                rules="required">
                <b-form-input
                  id="id"
                  :state="errors.length > 0 ? false : null"
                  name="id"
                  v-model="invoices.data.user.id"
                  :value="invoices.data.user.id"
                  readonly />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Jenis Pendaftaran"
              label-for="jenis_pendaftaran">
              <validation-provider
                #default="{ errors }"
                name="Jenis Pendaftaran"
                rules="required">
                <b-form-input
                  id="jenis_pendaftaran"
                  :state="errors.length > 0 ? false : null"
                  name="jenis_pendaftaran"
                  v-model="invoices.data.user.jenis_pendaftaran"
                  :value="invoices.data.user.jenis_pendaftaran"
                  readonly />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Pass Foto *" label-for="pasphoto" class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="pasphoto"
                rules="required">
                <b-form-file
                  id="pasphoto"
                  :state="errors.length > 0 ? false : null"
                  v-model="invoices.data.user.pasphoto"
                  accept="image/*"
                  @change="passphoto($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <table class="mt-1">
                <tbody>
                  <tr v-if="invoices.data.user.pasphoto != null">
                    <td>
                      <img
                        :src="invoices.data.user.pasphoto"
                        alt="gallery_image"
                        width="320"
                        height="280" />
                    </td>
                  </tr>
                  <tr v-else>
                    <p>belum ada foto</p>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
            <b-form-group label="Nomor NPA" label-for="npa_idi">
              <validation-provider
                #default="{ errors }"
                name="Nomor NPA"
                rules="required">
                <b-form-input
                  id="npa_idi"
                  :state="errors.length > 0 ? false : null"
                  name="npa_idi"
                  v-model="invoices.data.user.npa_idi"
                  :value="invoices.data.user.npa_idi" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Masa Berlaku NPA" label-for="npa_masa_berlaku">
              <validation-provider
                #default="{ errors }"
                name="Masa Berlaku NPA"
                rules="required">
                <b-form-datepicker
                  id="npa_masa_berlaku"
                  :state="errors.length > 0 ? false : null"
                  name="npa_masa_berlaku"
                  v-model="invoices.data.user.npa_masa_berlaku"
                  :value="invoices.data.user.npa_masa_berlaku" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- kta-->
            <b-form-group label="File KTA *" label-for="npa_file" class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="npa_file"
                rules="required">
                <b-form-file
                  id="npa_file"
                  :state="errors.length > 0 ? false : null"
                  v-model="invoices.data.user.npa_file"
                  accept="image/*"
                  @change="npaFile($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <table class="mt-1">
                <tbody>
                  <tr v-if="invoices.data.user.npa_file != null">
                    <td>
                      <img
                        :src="invoices.data.user.npa_file"
                        alt="gallery_image"
                        width="320"
                        height="280" />
                    </td>
                  </tr>
                  <tr v-else>
                    <p>belum ada foto</p>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
            <b-form-group label="Nama Lengkap" label-for="nama_lengkap">
              <validation-provider
                #default="{ errors }"
                name="Nama Lengkap"
                rules="required">
                <b-form-input
                  id="nama_lengkap"
                  :state="errors.length > 0 ? false : null"
                  name="nama_lengkap"
                  v-model="invoices.data.user.nama_lengkap"
                  :value="invoices.data.user.nama_lengkap" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Gelar Depan" label-for="gelar_depan">
              <validation-provider
                #default="{ errors }"
                name="Gelar Depan"
                rules="required">
                <b-form-input
                  id="gelar_depan"
                  :state="errors.length > 0 ? false : null"
                  name="gelar_depan"
                  v-model="invoices.data.user.gelar_depan"
                  :value="invoices.data.user.gelar_depan" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Gelar Belakang" label-for="gelar_belakang">
              <validation-provider
                #default="{ errors }"
                name="Gelar Belakang"
                rules="required">
                <b-form-input
                  id="gelar_belakang"
                  :state="errors.length > 0 ? false : null"
                  name="gelar_belakang"
                  v-model="invoices.data.user.gelar_belakang"
                  :value="invoices.data.user.gelar_belakang" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tempat Lahir" label-for="tempat_lahir">
              <validation-provider
                #default="{ errors }"
                name="Tempat Lahir"
                rules="required">
                <b-form-input
                  id="tempat_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tempat_lahir"
                  v-model="invoices.data.user.tempat_lahir"
                  :value="invoices.data.user.tempat_lahir" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tanggal Lahir" label-for="tanggal_lahir">
              <validation-provider
                #default="{ errors }"
                name="Tanggal Lahir"
                rules="required">
                <b-form-datepicker
                  id="tanggal_lahir"
                  :state="errors.length > 0 ? false : null"
                  name="tanggal_lahir"
                  v-model="invoices.data.user.tanggal_lahir"
                  :value="invoices.data.user.tanggal_lahir" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Jenis Kelamin" label-for="jenis_kelamin">
              <validation-provider
                #default="{ errors }"
                name="Jenis Kelamin"
                rules="required">
                <b-form-input
                  id="jenis_kelamin"
                  :state="errors.length > 0 ? false : null"
                  name="jenis_kelamin"
                  v-model="invoices.data.user.jenis_kelamin"
                  :value="invoices.data.user.jenis_kelamin" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Jenis Kartu Identitas"
              label-for="kartu_id_jenis">
              <validation-provider
                #default="{ errors }"
                name="Jenis Kartu Identitas"
                rules="required">
                <b-form-input
                  id="kartu_id_jenis"
                  :state="errors.length > 0 ? false : null"
                  name="kartu_id_jenis"
                  v-model="invoices.data.user.kartu_id_jenis"
                  :value="invoices.data.user.kartu_id_jenis" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor Identitas" label-for="kartu_id_nomor">
              <validation-provider
                #default="{ errors }"
                name="Nomor Identitas"
                rules="required">
                <b-form-input
                  id="kartu_id_nomor"
                  :state="errors.length > 0 ? false : null"
                  name="kartu_id_nomor"
                  v-model="invoices.data.user.kartu_id_nomor"
                  :value="invoices.data.user.kartu_id_nomor" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- kartu identitas(ktp)-->
            <b-form-group
              label="File Identitas *"
              label-for="kartu_id_file"
              class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="kartu_id_file"
                rules="required">
                <b-form-file
                  id="kartu_id_file"
                  :state="errors.length > 0 ? false : null"
                  v-model="invoices.data.user.kartu_id_file"
                  accept="image/*"
                  @change="kartuIdentitas($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <table class="mt-1">
                <tbody>
                  <tr v-if="invoices.data.user.kartu_id_file != null">
                    <td>
                      <img
                        :src="invoices.data.user.kartu_id_file"
                        alt="gallery_image"
                        width="320"
                        height="280" />
                    </td>
                  </tr>
                  <tr v-else>
                    <p>belum ada foto</p>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
            <b-form-group
              label="Status Pernikahan"
              label-for="pernikahan_status">
              <validation-provider
                #default="{ errors }"
                name="Status Pernikahan"
                rules="required">
                <b-form-input
                  id="pernikahan_status"
                  :state="errors.length > 0 ? false : null"
                  name="pernikahan_status"
                  v-model="invoices.data.user.pernikahan_status"
                  :value="invoices.data.user.pernikahan_status" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Nama Pasangan"
              label-for="pernikahan_nama_pasangan">
              <validation-provider
                #default="{ errors }"
                name="Nama Pasangan"
                rules="required">
                <b-form-input
                  id="pernikahan_nama_pasangan"
                  :state="errors.length > 0 ? false : null"
                  name="pernikahan_nama_pasangan"
                  v-model="invoices.data.user.pernikahan_nama_pasangan"
                  :value="invoices.data.user.pernikahan_nama_pasangan" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Alamat Tempat Tinggal"
              label-for="alamat_rumah">
              <validation-provider
                #default="{ errors }"
                name="Alamat Tempat Tinggal"
                rules="required">
                <b-form-input
                  id="alamat_rumah"
                  :state="errors.length > 0 ? false : null"
                  name="alamat_rumah"
                  v-model="invoices.data.user.alamat_rumah"
                  :value="invoices.data.user.alamat_rumah" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Telpon" label-for="nomor_telpon">
              <validation-provider
                #default="{ errors }"
                name="Telpon"
                rules="required">
                <b-form-input
                  id="nomor_telpon"
                  :state="errors.length > 0 ? false : null"
                  name="nomor_telpon"
                  v-model="invoices.data.user.nomor_telpon"
                  :value="invoices.data.user.nomor_telpon" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="No HP" label-for="nomor_hp">
              <validation-provider
                #default="{ errors }"
                name="No HP"
                rules="required">
                <b-form-input
                  id="nomor_hp"
                  :state="errors.length > 0 ? false : null"
                  name="nomor_hp"
                  v-model="invoices.data.user.nomor_hp"
                  :value="invoices.data.user.nomor_hp" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required">
                <b-form-input
                  id="email"
                  :state="errors.length > 0 ? false : null"
                  name="email"
                  v-model="invoices.data.user.email"
                  :value="invoices.data.user.email" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
        <hr />
        <app-collapse class="p-0">
          <app-collapse-item
            :is-visible="visible.pendidikan"
            title="Data Pendidikan"
            class="shadow-none p-0"
            @visible="changeVisibleDataPendidikan">
            <br />
            <!-- form submit data pendidikan-->
            <b-form-group
              label="Asal Negara Universitas"
              label-for="du_asal_negara_univ">
              <validation-provider
                #default="{ errors }"
                name="Asal Negara Universitas"
                rules="required">
                <b-form-input
                  id="du_asal_negara_univ"
                  :state="errors.length > 0 ? false : null"
                  name="du_asal_negara_univ"
                  v-model="invoices.data.user.du_asal_negara_univ"
                  :value="invoices.data.user.du_asal_negara_univ" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Asal Fakultas Kedokteran"
              label-for="du_asal_fak_kedokteran">
              <validation-provider
                #default="{ errors }"
                name="Asal Fakultas Kedokteran"
                rules="required">
                <b-form-input
                  id="du_asal_fak_kedokteran"
                  :state="errors.length > 0 ? false : null"
                  name="du_asal_fak_kedokteran"
                  v-model="invoices.data.user.du_asal_fak_kedokteran"
                  :value="invoices.data.user.du_asal_fak_kedokteran" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tahun Masuk" label-for="du_tahun_masuk">
              <validation-provider
                #default="{ errors }"
                name="Tahun Masuk"
                rules="required">
                <b-form-input
                  id="du_tahun_masuk"
                  :state="errors.length > 0 ? false : null"
                  name="du_tahun_masuk"
                  v-model="invoices.data.user.du_tahun_masuk"
                  :value="invoices.data.user.du_tahun_masuk" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Tahun Lulus" label-for="du_tahun_lulus">
              <validation-provider
                #default="{ errors }"
                name="Tahun Lulus"
                rules="required">
                <b-form-input
                  id="du_tahun_lulus"
                  :state="errors.length > 0 ? false : null"
                  name="du_tahun_lulus"
                  v-model="invoices.data.user.du_tahun_lulus"
                  :value="invoices.data.user.du_tahun_lulus" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Nomor Ijazah" label-for="du_nomor_ijazah">
              <validation-provider
                #default="{ errors }"
                name="Nomor Ijazah"
                rules="required">
                <b-form-input
                  id="du_nomor_ijazah"
                  :state="errors.length > 0 ? false : null"
                  name="du_nomor_ijazah"
                  v-model="invoices.data.user.du_nomor_ijazah"
                  :value="invoices.data.user.du_nomor_ijazah" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- ijazah file-->
            <b-form-group
              label="Ijazah File *"
              label-for="du_ijazah_file"
              class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="du_ijazah_file"
                rules="required">
                <b-form-file
                  id="du_ijazah_file"
                  :state="errors.length > 0 ? false : null"
                  v-model="invoices.data.user.du_ijazah_file"
                  accept="image/*"
                  @change="ijzahFile($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <table class="mt-1">
                <tbody>
                  <tr v-if="invoices.data.user.du_ijazah_file != null">
                    <td>
                      <img
                        :src="invoices.data.user.du_ijazah_file"
                        alt="gallery_image"
                        width="320"
                        height="280" />
                    </td>
                  </tr>
                  <tr v-else>
                    <p>belum ada foto ijzah</p>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
        <hr />
        <app-collapse class="p-0">
          <app-collapse-item
            :is-visible="visible.pekerjaan"
            title="Data Pekerjaan"
            class="shadow-none p-0"
            @visible="changeVisibleDataPekerjaan">
            <br />
            <!-- form submit data pekerjaan -->
            <b-form-group label="Jenis Pekerjaan" label-for="pekerjaan_jenis">
              <validation-provider
                #default="{ errors }"
                name="Jenis Pekerjaan"
                rules="required">
                <b-form-input
                  id="pekerjaan_jenis"
                  :state="errors.length > 0 ? false : null"
                  name="pekerjaan_jenis"
                  v-model="invoices.data.user.pekerjaan_jenis"
                  :value="invoices.data.user.pekerjaan_jenis" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Nama Institusi"
              label-for="pekerjaan_nama_institusi">
              <validation-provider
                #default="{ errors }"
                name="Nama Institusi"
                rules="required">
                <b-form-input
                  id="pekerjaan_nama_institusi"
                  :state="errors.length > 0 ? false : null"
                  name="pekerjaan_nama_institusi"
                  v-model="invoices.data.user.pekerjaan_nama_institusi"
                  :value="invoices.data.user.pekerjaan_nama_institusi" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Alamat Institusi"
              label-for="pekerjaan_alamat_institusi">
              <validation-provider
                #default="{ errors }"
                name="Alamat Institusi"
                rules="required">
                <b-form-input
                  id="pekerjaan_alamat_institusi"
                  :state="errors.length > 0 ? false : null"
                  name="pekerjaan_alamat_institusi"
                  v-model="invoices.data.user.pekerjaan_alamat_institusi"
                  :value="invoices.data.user.pekerjaan_alamat_institusi" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Telpon Institusi" label-for="pekerjaan_telpon">
              <validation-provider
                #default="{ errors }"
                name="Telpon Institusi"
                rules="required">
                <b-form-input
                  id="pekerjaan_telpon"
                  :state="errors.length > 0 ? false : null"
                  name="pekerjaan_telpon"
                  v-model="invoices.data.user.pekerjaan_telpon"
                  :value="invoices.data.user.pekerjaan_telpon" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Email Institusi" label-for="pekerjaan_email">
              <validation-provider
                #default="{ errors }"
                name="Email Institusi"
                rules="required">
                <b-form-input
                  id="pekerjaan_email"
                  :state="errors.length > 0 ? false : null"
                  name="pekerjaan_email"
                  v-model="invoices.data.user.pekerjaan_email"
                  :value="invoices.data.user.pekerjaan_email" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
        <hr />
        <app-collapse class="p-0">
          <app-collapse-item
            :is-visible="visible.serkom"
            title="Data Kompetensi"
            class="shadow-none p-0"
            @visible="changeVisibleDataSerkom">
            <br />
            <!-- form submit data serkom-->
            <b-form-group label="Nomor Dokumen" label-for="sertif_kompt_nomor">
              <validation-provider
                #default="{ errors }"
                name="Nomor Dokumen"
                rules="required">
                <b-form-input
                  id="sertif_kompt_nomor"
                  :state="errors.length > 0 ? false : null"
                  name="sertif_kompt_nomor"
                  v-model="invoices.data.user.sertif_kompt_nomor"
                  :value="invoices.data.user.sertif_kompt_nomor" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Tanggal Terbit"
              label-for="sertif_kompt_tgl_terbit">
              <validation-provider
                #default="{ errors }"
                name="Tanggal Terbit"
                rules="required">
                <b-form-datepicker
                  id="sertif_kompt_tgl_terbit"
                  :state="errors.length > 0 ? false : null"
                  name="sertif_kompt_tgl_terbit"
                  v-model="invoices.data.user.sertif_kompt_tgl_terbit"
                  :value="invoices.data.user.sertif_kompt_tgl_terbit" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <b-form-group
              label="Tanggal Berakhir"
              label-for="sertif_kompt_tgl_berakhir">
              <validation-provider
                #default="{ errors }"
                name="Tanggal Berakhir"
                rules="required">
                <b-form-datepicker
                  id="sertif_kompt_tgl_berakhir"
                  :state="errors.length > 0 ? false : null"
                  name="sertif_kompt_tgl_berakhir"
                  v-model="invoices.data.user.sertif_kompt_tgl_berakhir"
                  :value="invoices.data.user.sertif_kompt_tgl_berakhir" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- serkom file-->
            <b-form-group
              label="file sertifikat kompetensi"
              label-for="sertif_kompt_file"
              class="mt-1">
              <validation-provider
                #default="{ errors }"
                name="sertif_kompt_file"
                rules="required">
                <b-form-file
                  id="sertif_kompt_file"
                  :state="errors.length > 0 ? false : null"
                  v-model="invoices.data.user.sertif_kompt_file"
                  accept="image/*"
                  @change="serkomFile($event)" />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
              <table class="mt-1">
                <tbody>
                  <tr v-if="invoices.data.user.sertif_kompt_file != null">
                    <td>
                      <img
                        :src="invoices.data.user.sertif_kompt_file"
                        alt="gallery_image"
                        width="320"
                        height="280" />
                    </td>
                  </tr>
                  <tr v-else>
                    <p>belum ada foto serkom</p>
                  </tr>
                </tbody>
              </table>
            </b-form-group>
          </app-collapse-item>
        </app-collapse>
        <br />
        <b-form class="mt-1" @submit.prevent>
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validateLengkapiDataCalonAnggota">
            Lengkapi Data
          </b-button>
        </b-form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import {
  BButton,
  BCard,
  BForm,
  BFormInput,
  BFormSelect,
  BFormFile,
  BModal,
  BFormGroup,
  BFormTextarea,
  BFormCheckbox,
  BFormDatepicker,
  BFormTimepicker,
  VBModal,
  BCardText,
  BImg,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

import { required } from "@validations";

import apis from "@/api";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BForm,
    BFormInput,
    BFormSelect,
    BFormFile,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
    BModal,
    BCard,
    BCardText,
    BFormDatepicker,
    BFormTimepicker,
    BImg,
    AppCollapseItem,
    AppCollapse,
  },
  directives: {
    "b-modal": VBModal,
  },
  data() {
    return {
      required,
      invoices: {
        data: {
          user: {
            //lengkapi data
            id: "",
            email: "",
            npa_idi: "",
            nama_lengkap: null,
            tanggal_lahir: "",
            tempat_lahir: "",
            nomor_telpon: "",
            jenis_kelamin: "",
            kartu_id_jenis: "",
            kartu_id_nomor: "",
            alamat_rumah: "",
            nomor_hp: "",
            gelar_depan: "",
            gelar_belakang: "",
            npa_masa_berlaku: "",
            // pasphoto: "",
            // npa_file: "",
            // kartu_id_file: "",

            //pernikahan
            pernikahan_status: "",
            pernikahan_nama_pasangan: "",

            //pendidikan
            du_asal_negara_univ: "",
            du_asal_fak_kedokteran: "",
            du_tahun_masuk: "",
            du_tahun_lulus: "",
            du_nomor_ijazah: "",
            // du_ijazah_file: "",

            //pekerjaan
            pekerjaan_nama_institusi: "",
            pekerjaan_alamat_institusi: "",
            pekerjaan_jenis: "",
            pekerjaan_telpon: "",
            pekerjaan_email: "",

            //sertif
            sertif_kompt_nomor: "",
            sertisertif_kompt_tgl_terbitf_kompt_nomor: "",
            sertif_kompt_tgl_berakhir: "",
            // sertif_kompt_file: "",
          },
        },
        isLoading: true,
      },
      buktiBayarBase64: {},
      tempBuktiBayar: null,
      visible: {
        dataDiri: false,
        pendidikan: false,
        pekerjaan: false,
        serkom: false,
      },
      upload: {
        invoices: null,
        pasphoto: null,
        npa_file: null,
        kartu_id_file: null,
        du_ijazah_file: null,
        sertif_kompt_file: null,
      },
    };
  },
  computed: {},
  watch: {
    invoices: {
      deep: true,
      // handler(val) {
      //   console.log(val.data)
      // },
    },
  },
  mounted() {},
  created() {
    this.fetchInvoiceCalonAnggota();
  },
  methods: {
    changeVisibleDataDiri(payload) {
      this.visible.dataDiri = payload;
    },
    changeVisibleDataPendidikan(payload) {
      this.visible.pendidikan = payload;
    },
    changeVisibleDataPekerjaan(payload) {
      this.visible.pekerjaan = payload;
    },
    changeVisibleDataSerkom(payload) {
      this.visible.serkom = payload;
    },

    validateLengkapiDataCalonAnggota() {
      this.$refs.lengkapiDataCalonAnggota.validate().then((success) => {
        if (success) {
          this.sumbitLengkapiDataCalonAnggota();
        }
      });
    },

    validateUploadBuktiBayar() {
      this.$refs.buktiBayarValidation.validate().then((success) => {
        if (success) {
          this.submitBuktiBayar();
        }
      });
    },

    //handler bukti bayar dan lengkapi data profile
    buktiBayar(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.upload.invoices = result;
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

    passphoto(e) {
      const { files } = e.target;
      if (files.length) {
        this.createPassPhoto(files[0], (result) => {
          this.upload.pasphoto = result;
        });
      }
    },

    createPassPhoto(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //npa file
    npaFile(e) {
      const { files } = e.target;
      if (files.length) {
        this.createNpaFile(files[0], (result) => {
          this.upload.npa_file = result;
        });
      }
    },

    createNpaFile(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //kartu identitas(ktp)
    kartuIdentitas(e) {
      const { files } = e.target;
      if (files.length) {
        this.createIdentitasFile(files[0], (result) => {
          this.upload.kartu_id_file = result;
        });
      }
    },

    createIdentitasFile(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //ijzah file
    ijzahFile(e) {
      const { files } = e.target;
      if (files.length) {
        this.createIjazahFile(files[0], (result) => {
          this.upload.du_ijazah_file = result;
        });
      }
    },

    createIjazahFile(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //file serkom
    serkomFile(e) {
      const { files } = e.target;
      if (files.length) {
        this.createSerkomFile(files[0], (result) => {
          this.upload.sertif_kompt_file = result;
        });
      }
    },

    createSerkomFile(file, cb) {
      const reader = new FileReader();

      reader.onload = (e) => {
        cb(e.target.result);
      };
      reader.readAsDataURL(file);
    },

    //end bukti bayar dan lengkapi data profile

    submitBuktiBayar() {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.invoice
        .uploadBuktiBayar(this.invoices.data.invoice.id, {
          reginvoice_file: this.upload.invoices,
        })
        .then(() => {
          this.successHandler("berhasil upload bukti invoice");
          location.reload();
        })
        .catch((error) => {
          this.errorHandler(error, "gagal up invoice coba lagi");
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },

    sumbitLengkapiDataCalonAnggota() {
      var submitDataCalonAnggota = {
        ...this.invoices.data.user,
        pasphoto: this.upload.pasphoto,
        npa_file: this.upload.npa_file,
        kartu_id_file: this.upload.kartu_id_file,
        du_ijazah_file: this.upload.du_ijazah_file,
        sertif_kompt_file: this.upload.sertif_kompt_file,
      };

      try {
        this.$swal({
          title: "Apakah kamu yakin?",
          text: "Data yang kamu masukan sesuai dengan data asli kamu ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, Submit!",
          cancelButtonText: "Batal",
          customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-outline-danger ml-1",
          },
          buttonsStyling: false,
        })
          .then((result) => {
            if (result.value) {
              this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
              return apis.invoice.lengkapiDataCalonAngota(
                submitDataCalonAnggota
              );
            }
            return false;
          })
          .then((result) => {
            if (result) {
              this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
              this.$toast({
                component: ToastificationContentVue,
                props: {
                  title: "Berhasil melengkapi data profile ",
                  icon: "CheckIcon",
                  variant: "success",
                },
              });
            }
            location.reload();
          })
          .catch((error) => {
            this.errorHandler(error, "gagal perbaharui data anda");
          });
      } catch (error) {
        this.errorHandler(error, "kesalahan sistem silahkan coba lagi");
      }
    },

    fetchInvoiceCalonAnggota() {
      this.invoices.isLoading = true;
      apis.invoice
        .getInvoice(this.$route.params.id)
        .then(({ data }) => {
          this.invoices.data = data;
        })
        .finally(() => {
          this.invoices.isLoading = false;
        });
    },
  },
};
</script>

<style></style>
