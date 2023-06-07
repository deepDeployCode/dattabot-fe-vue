<template>
  <div>
    <b-button
      v-if="isHowAddPengajuan"
      size="sm"
      variant="outline-danger"
      @click="$router.push('/mutasi/pengajuan-mutasi-keluar')">
      + Buat Pengauan
    </b-button>
    <div v-if="mutasi.isLoading" class="d-flex justify-content-center mb-1">
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
            <div class="font-weight-bold">#MUTASI-KELUAR-{{ item.id }}</div>
          </div>
          <div
            v-if="item.mutkeluar_status === 'sedang-dibuat'"
            class="ml-auto pointer">
            <b-button
              size="sm"
              class="bg-danger bg-lighten-1 mr-25"
              @click="edit(item)">
              Edit
            </b-button>
          </div>
        </div>

        <!-- <div class="bg-warning rounded-top p-1">
          <div class="text-white">
            <p>Terimakasih telah mengajukan permohonan mutasi masuk.</p>
            <p>Data dan berkas telah diterima oleh aplikasi dan notifikasi sudah diberikan kepada admin.</p>
            <p>Selanjutnya Admin akan meneruskan berkas tersebut kepada PB IDI.</p>
            <p>Mohon untuk menunggu pembertahuan berikutnya.</p>
          </div>
        </div> -->
        <div
          v-if="item.mutkeluar_status === 'selesai-sukses'"
          class="font-weight-bold p-1">
          <div class="d-flex align-items-center justify-content-center mb-1">
            <feather-icon class="text-warning" icon="CheckIcon" size="50" />
          </div>
          <p>
            Selamat, Anda telah keluar dari anggota IDI cabang Jakarta Pusat.
          </p>
        </div>
        <div class="p-1">
          <div
            v-if="item.mutkeluar_status === 'diajukan'"
            class="font-weight-bold">
            <div class="d-flex align-items-center justify-content-center mb-1">
              <feather-icon class="text-warning" icon="InfoIcon" size="50" />
            </div>

            <br />

            Terimaksih telah mengajukan permohonan mutasi keluar.

            <br />
            <br />
            Surat yang telah diupload telah diterima oleh Admin dan dijadikan
            sebagai arsip.
            <br />
            <br />

            Mohon datang ke Sekretariat untuk mengantar surat yang asli.
            <br />
            <br />
          </div>

          <div
            v-if="item.mutkeluar_status === 'selesai-tolak'"
            class="font-weight-bold">
            <div class="d-flex align-items-center justify-content-center mb-1">
              <feather-icon class="text-warning" icon="InfoIcon" size="50" />
            </div>

            Proses telah selesai. Tetapi pengajuan ditolak.
            <br /><br />
            Mohon hubungi Admin untuk status ini.
          </div>

          <div
            v-if="item.mutkeluar_status === 'sedang-dibuat'"
            class="font-weight-bold">
            <div class="d-flex align-items-center justify-content-center mb-1">
              <feather-icon class="text-warning" icon="InfoIcon" size="50" />
            </div>
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
                <td class="font-weight-bold">: {{ item.mutkeluar_status }}</td>
              </tr>
              <tr>
                <td>Asal Cabang</td>
                <td class="font-weight-bold">
                  : {{ item.mutkeluar_asal_cabang }}
                </td>
              </tr>
              <tr>
                <td>Asal Wilayah</td>
                <td class="font-weight-bold">
                  : {{ item.mutkeluar_asal_wilayah }}
                </td>
              </tr>
              <tr>
                <td>Tujuan Cabang</td>
                <td class="font-weight-bold">
                  : {{ item.mutkeluar_tujuan_cabang }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex flex-column mt-25">
            <div class="font-weight-bold mb-25">Surat Pengajuan :</div>
            <div>
              <b-img
                v-if="item.mutkeluar_filemutasi"
                :src="fileMutasi(item)"
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
        this.user?.data?.orang_level === "jakpus" &&
        this.mutasi.data?.[0].mutkeluar_status === "selesai-sukses"
      );
    },
    isHowAddPengajuan() {
      return this.user?.data?.orang_level === "jakpus";
    },
    fileMutasi() {
      return (item) => {
        if (item.mutkeluar_filemutasi) {
          if (!item.mutkeluar_filemutasi.includes("https")) {
            return `https://www.staging.idijakpus.or.id/uploads/mutkeluar/mutkeluar_filemutasi/${item.id}/${item.mutkeluar_filemutasi}`;
          }
          return item.mutkeluar_filemutasi;
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
      apis.mutasiKeluar
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
      storage.setStorage("mutkeluar", {
        ...item,
        mutkeluar_filemutasi: this.fileMutasi(item),
      });
      this.$router.push({ path: "/mutasi/edit-pengajuan-mutasi-keluar" });
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
</script>

<style></style>
