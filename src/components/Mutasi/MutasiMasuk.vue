<template>
  <div>
    <b-button
      v-if="isHowAddPengajuan"
      size="sm"
      variant="outline-danger"
      @click="$router.push('/mutasi/pengajuan-mutasi-masuk')">
      + Buat Pengauan
    </b-button>
    <div
      v-if="mutasi.isLoading || user.isLoading"
      class="d-flex justify-content-center mb-1">
      <b-spinner label="Loading..." variant="danger" />
    </div>
    <div v-if="!isHidePengajuan">
      <b-card
        v-for="item in mutasi.data"
        :key="item.id"
        class="f-flex flex-column shadow-none border mt-1 p-0"
        no-body>
        <div class="d-flex p-1 border-bottom">
          <div>
            <div class="font-weight-bold">#MUTASI-MASUK-{{ item.id }}</div>
          </div>
          <div
            v-if="item.mutmasuk_status === 'sedang-dibuat'"
            class="ml-auto pointer">
            <b-button
              size="sm"
              class="bg-danger bg-lighten-1 mr-25"
              @click="edit(item)">
              Edit
            </b-button>
          </div>
        </div>

        <div
          v-if="item.mutmasuk_status === 'selesai-sukses'"
          class="font-weight-bold p-1">
          <div class="d-flex align-items-center justify-content-center mb-1">
            <feather-icon class="text-warning" icon="CheckIcon" size="50" />
          </div>
          <p>Selamat, Anda telah menjadi anggota IDI cabang Jakarta Pusat.</p>
        </div>
        <div class="p-1">
          <div
            v-if="item.mutmasuk_status === 'diajukan'"
            class="font-weight-bold">
            <div class="d-flex align-items-center justify-content-center mb-1">
              <feather-icon class="text-warning" icon="InfoIcon" size="50" />
            </div>

            <br />

            Terimaksih telah mengajukan permohonan mutasi masuk.
            <br />
            <br />

            Data dan berkas telah diterima oleh aplikasi dan notifikasi sudah
            diberikan kepada admin.
            <br />
            <br />

            Selanjutnya Admin akan meneruskan berkas tersebut kepada PB IDI.
            <br />
            <br />

            Mohon untuk menunggu pembertahuan berikutnya.
            <br />
            <br />
          </div>

          <div
            v-if="item.mutmasuk_status === 'selesai-tolak'"
            class="font-weight-bold">
            Proses telah selesai. Tetapi pengajuan ditolak.
            <br /><br />
            Mohon hubungi Admin untuk status ini.
          </div>

          <div
            v-if="item.mutmasuk_status === 'sedang-dibuat'"
            class="font-weight-bold">
            Silahkan lengkapi data yang diajukan, agar bisa di proses oleh
            Admin.
          </div>
          <hr />
          <div class="font-weight-bold mb-1" style="font-size: 16px">
            Data yang di Ajukan
          </div>
          <table>
            <tbody>
              <tr>
                <td>Status</td>
                <td class="font-weight-bold">: {{ item.mutmasuk_status }}</td>
              </tr>
              <tr>
                <td>Asal Cabang</td>
                <td class="font-weight-bold">
                  : {{ item.mutmasuk_asal_cabang }}
                </td>
              </tr>
              <tr>
                <td>Asal Wilayah</td>
                <td class="font-weight-bold">
                  : {{ item.mutmasuk_asal_wilayah }}
                </td>
              </tr>
              <tr>
                <td>Tujuan Cabang</td>
                <td class="font-weight-bold">: {{ item.mutmasuk_tujuan }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex flex-column mt-25">
            <div class="font-weight-bold mb-25">FIle Iuran Asal</div>
            <div>
              <b-img
                v-if="item.mutmasuk_file_iuranasal"
                :src="fileIuranAsal(item)"
                style="max-width: 200px; max-height: 200px"
                fluid
                center />
            </div>
          </div>
          <div class="d-flex flex-column mt-25">
            <div class="font-weight-bold mb-25">FIle Keterangan Pindah</div>
            <div>
              <b-img
                v-if="item.mutmasuk_file_ketpindah"
                :src="fileKeteranganPindah(item)"
                style="max-width: 200px; max-height: 200px"
                fluid
                center />
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { BButton, BCard, BImg, BSpinner } from "bootstrap-vue";
import apis from "@/api";
import storage from "@/helpers/storage";

export default {
  components: {
    BButton,
    BImg,
    BCard,
    BSpinner,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      examplePicStudiKasus: require("@/assets/images/pages/Studi_Kasus_Contoh.jpeg"),
      mutasi: {
        data: null,
        isLoading: false,
      },
      user: {
        data: null,
        isLoading: false,
      },
    };
  },
  computed: {
    isHidePengajuan() {
      return (
        this.user?.data?.orang_level === "non-jakpus" &&
        this.mutasi.data?.[0].mutmasuk_status === "selesai-sukses"
      );
    },
    isHowAddPengajuan() {
      return this.user?.data?.orang_level === "non-jakpus";
    },
    fileIuranAsal() {
      return (item) => {
        if (item.mutmasuk_file_iuranasal) {
          if (!item.mutmasuk_file_iuranasal.includes("https")) {
            return `https://www.staging.idijakpus.or.id/uploads/mutmasuk/mutmasuk_file_iuranasal/${item.id}/${item.mutmasuk_file_iuranasal}`;
          }
          return item.mutmasuk_file_iuranasal;
        }
        return null;
      };
    },
    fileKeteranganPindah() {
      return (item) => {
        if (item.mutmasuk_file_ketpindah) {
          if (!item.mutmasuk_file_ketpindah.includes("https")) {
            return `https://www.staging.idijakpus.or.id/uploads/mutmasuk/mutmasuk_file_ketpindah/${item.id}/${item.mutmasuk_file_ketpindah}`;
          }
          return item.mutmasuk_file_ketpindah;
        }
        return null;
      };
    },
  },
  created() {
    this.fetchMutasi();
  },
  methods: {
    fetchMutasi() {
      this.fetchUser();
      this.mutasi.isLoading = true;
      apis.mutasiMasuk
        .getPengajuan()
        .then(({ data }) => {
          if (data.data.length) {
            this.mutasi.data = [data.data[0]];
          }
        })
        .finally(() => {
          this.mutasi.isLoading = false;
        });
    },
    edit(item) {
      storage.setStorage("mutmask", {
        ...item,
        mutmasuk_file_iuranasal: this.fileIuranAsal(item),
        mutmasuk_file_ketpindah: this.fileKeteranganPindah(item),
      });
      this.$router.push({ path: "/mutasi/edit-pengajuan-mutasi-masuk" });
    },
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
  },
};
// orang_level "non-jakpus"
// jakpus
</script>

<style></style>
