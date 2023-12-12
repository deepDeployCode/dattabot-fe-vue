<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div class="d-flex flex-row">
        <!-- <div style="width: 50%" class="pr-25">
          <b-button
            :variant="`${!toggleUploadBerkas ? 'outline-' : ''}danger`"
            block
            @click="toggleUploadBerkas = !toggleUploadBerkas"
          >
            {{ toggleUploadBerkas ? "Batalkan " : "Add Task" }}
          </b-button>
        </div>
        <div style="width: 50%" class="pl-25">
          <b-button
            variant="outline-danger"
            block
            @click="$router.push('/krip/jadwal')"
          >
            List Archive Task
          </b-button>
        </div> -->
      </div>

      <b-form v-if="toggleUploadBerkas" class="mt-1" @submit.prevent>
        <validation-observer ref="formKRIP">
          <!-- <b-form-group label="Berkas" label-for="berkas">
            <validation-provider
              #default="{ errors }"
              name="berkas"
              rules="required"
            >
              <b-form-file
                id="berkas"
                v-model="tempFileBerkas"
                :state="errors.length > 0 ? false : null"
                name="file"
                @change="onChangeFileBerkas($event)"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <b-img
              v-if="fileBerkas"
              fluid
              center
              :src="fileBerkas"
              alt="fileBerkas"
              class="mt-1"
              style="max-height: 250px"
            />
          </b-form-group> -->
          <b-form-group label="title" label-for="title">
            <validation-provider
              #default="{ errors }"
              name="title"
              rules="required"
            >
              <b-form-input
                id="title"
                v-model="title"
                :state="errors.length > 0 ? false : null"
                name="title"
                placeholder="title here"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="description" label-for="description">
            <validation-provider
              #default="{ errors }"
              name="description"
              rules="required"
            >
              <b-form-input
                id="description"
                v-model="description"
                :state="errors.length > 0 ? false : null"
                name="description"
                placeholder="description here"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="due_date" label-for="due_date">
            <validation-provider
              #default="{ errors }"
              name="due_date"
              rules="required"
            >
              <b-form-input
                id="due_date"
                v-model="due_date"
                :state="errors.length > 0 ? false : null"
                name="due_date"
                placeholder="due_date here"
                type="date"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="task_priority" label-for="task_priority">
            <validation-provider
              #default="{ errors }"
              name="task_priority"
              rules="required"
            >
              <b-form-select
                v-model="task_priority"
                :state="errors.length > 0 ? false : null"
                :options="taskpriority"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-button
            type="submit"
            variant="outline-danger"
            block
            @click="validationForm"
          >
            Simpan
          </b-button>
        </validation-observer>
        <hr />
      </b-form>
      <div class="mt-1">
        <b-card
          v-for="item in krip.data"
          :key="item.id"
          class="shadow-none border p-1 mb-1"
          no-body
        >
          <div class="d-flex pb-1 border-bottom">
            <div>
              <div class="font-weight-bold">#Pokemon-ID-{{ item.id }}</div>
              <!-- <b-badge variant="light-danger font-weight–light mt-25">
                Belum terverifikasi
              </b-badge> -->
            </div>
            <div
              class="ml-auto pointer text-danger"
              @click="pokemonModalDetail(item.id)"
            >
              <feather-icon icon="InfoIcon" size="16" class="align-middle" />
            </div>
          </div>
          <div class="pb-1 pt-1">
            <b-img
              v-if="!isPDF(item)"
              :src="getKRPFile(item)"
              fluid
              class="mb-25"
            />
            <div
              v-else
              class="text-primary text-underline pointer"
              @click="viewPdf(getKRPFile(item))"
            >
              <u>Lihat berkas</u>
            </div>
          </div>
          <div class="pb-1 pt-1">
            <p>Name: {{ item.name }}</p>
            <p>Species: {{ item.species }}</p>
          </div>
        </b-card>

        <div v-if="krip.isLoading" class="d-flex justify-content-center mb-1">
          <b-spinner label="Loading..." variant="danger" />
        </div>
      </div>
      <b-modal
        id="pokemonsDetailData"
        modal-class="modal-danger"
        centered
        title="Detail Pokemon"
        hide-footer
      >
        <div>
          <p>
            <b>pokedex_data:</b>
          </p>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>pokedex_number</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.pokedex_number }}
                </td>
              </tr>
              <tr>
                <td>name</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.name }}
                </td>
              </tr>
              <tr>
                <td>german_name</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.german_name }}
                </td>
              </tr>
              <tr>
                <td>japanese_name</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.japanese_name }}
                </td>
              </tr>
              <tr>
                <td>generation</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.generation }}
                </td>
              </tr>
              <tr>
                <td>species</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.species }}
                </td>
              </tr>
              <tr>
                <td>height_m</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.height_m }}
                </td>
              </tr>
              <tr>
                <td>weight_kg</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.pokedex_data.weight_kg }}
                </td>
              </tr>
              <tr>
                <td>abilities</td>
                <td class="font-weight-bold">
                  :
                  <b-badge variant="warning font-weight–light mt-25">{{
                    detailPokemon.pokedex_data.abilities.primary
                  }}</b-badge>
                  <b-badge variant="warning font-weight–light mt-25">{{
                    detailPokemon.pokedex_data.abilities.hidden
                  }}</b-badge>
                </td>
              </tr>
              <tr>
                <td>type</td>
                :
                <b-badge variant="warning font-weight–light mt-25">{{
                  detailPokemon.pokedex_data.type.primary
                }}</b-badge>
                <b-badge variant="warning font-weight–light mt-25">{{
                  detailPokemon.pokedex_data.type.secondary
                }}</b-badge>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div>
          <p>
            <b>base_state:</b>
          </p>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>total_points</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.base_state.total_points }}
                </td>
              </tr>
              <tr>
                <td>hp</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.base_state.hp }}
                </td>
              </tr>
              <tr>
                <td>attack</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.base_state.attack }}
                </td>
              </tr>
              <tr>
                <td>defense</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.base_state.defense }}
                </td>
              </tr>
              <tr>
                <td>sp</td>
                <b-badge variant="warning font-weight–light mt-25">{{
                  detailPokemon.base_state.sp.attack
                }}</b-badge>
                <b-badge variant="warning font-weight–light mt-25">{{
                  detailPokemon.base_state.sp.defense
                }}</b-badge>
                <b-badge variant="warning font-weight–light mt-25">{{
                  detailPokemon.base_state.sp.speed
                }}</b-badge>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>
            <b>training:</b>
          </p>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>catch_rate</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.training.catch_rate }}
                </td>
              </tr>
              <tr>
                <td>base_friendship</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.training.base_friendship }}
                </td>
              </tr>
              <tr>
                <td>base_experience</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.training.base_experience }}
                </td>
              </tr>
              <tr>
                <td>growth_rate</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.training.growth_rate }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>
            <b>breeding:</b>
          </p>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>egg_type_number</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.breeding.egg_type_number }}
                </td>
              </tr>
              <tr>
                <td>egg_type_number</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.breeding.egg_type_number }}
                </td>
              </tr>
              <tr>
                <td>egg_type</td>
                <td class="font-weight-bold">
                  :
                  <b-badge variant="warning font-weight–light mt-25">{{
                    detailPokemon.breeding.egg_type.first
                  }}</b-badge>
                  <b-badge variant="warning font-weight–light mt-25">{{
                    detailPokemon.breeding.egg_type.secondary
                  }}</b-badge>
                </td>
              </tr>
              <tr>
                <td>percentage_male</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.breeding.percentage_male }}
                </td>
              </tr>
              <tr>
                <td>egg_cycles</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.breeding.egg_cycles }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p>
            <b>type_defenses:</b>
          </p>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>against_normal</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_normal }}
                </td>
              </tr>
              <tr>
                <td>against_fire</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_fire }}
                </td>
              </tr>
              <tr>
                <td>against_water</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_water }}
                </td>
              </tr>
              <tr>
                <td>against_electric</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_electric }}
                </td>
              </tr>
              <tr>
                <td>against_grass</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_grass }}
                </td>
              </tr>
              <tr>
                <td>against_ice</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_ice }}
                </td>
              </tr>
              <tr>
                <td>against_fight</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_fight }}
                </td>
              </tr>
              <tr>
                <td>against_poison</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_poison }}
                </td>
              </tr>
              <tr>
                <td>against_ground</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_ground }}
                </td>
              </tr>
              <tr>
                <td>against_flying</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_flying }}
                </td>
              </tr>
              <tr>
                <td>against_psychic</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_psychic }}
                </td>
              </tr>
              <tr>
                <td>against_bug</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_bug }}
                </td>
              </tr>
              <tr>
                <td>against_rock</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_rock }}
                </td>
              </tr>
              <tr>
                <td>against_ghost</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_ghost }}
                </td>
              </tr>
              <tr>
                <td>against_dragon</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_dragon }}
                </td>
              </tr>
              <tr>
                <td>against_dark</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_dark }}
                </td>
              </tr>
              <tr>
                <td>against_steel</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_steel }}
                </td>
              </tr>
              <tr>
                <td>against_fairy</td>
                <td class="font-weight-bold">
                  : {{ detailPokemon.type_defenses.against_fairy }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */

import {
  BButton,
  BCard,
  BImg,
  BSpinner,
  BForm,
  BFormGroup,
  BFormFile,
  BModal,
  BFormSelect,
  BFormInput,
  BBadge,
  // BBadge,
} from "bootstrap-vue";
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
// import { required, email } from '@validations'
import apis from "@/api";
import storage from "@/helpers/storage";
import { required } from "@validations";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    BButton,
    BCard,
    BImg,
    BSpinner,
    BForm,
    BFormInput,
    BFormSelect,
    BFormGroup,
    BFormFile,
    BModal,
    BBadge,
    ValidationProvider,
    ValidationObserver,
    // BBadge,
  },
  data() {
    return {
      required,
      examplePicStudiKasus: require("@/assets/images/pages/Studi_Kasus_Contoh.jpeg"),
      krip: {
        data: null,
        isLoading: false,
        nextPageUrl: null,
      },
      tempFileBerkas: null,
      fileBerkas: null,
      toggleUploadBerkas: false,
      detailPokemon: {
        pokedex_data: {
          type: {},
          abilities: {},
        },
        base_state: { sp: {} },
        training: {},
        breeding: { egg_type: {} },
        type_defenses: {},
      },
      taskpriority: ["Normal", "Low", "Urgent", "High"],
    };
  },
  computed: {
    // https://www.idijakpus.or.id/uploads/krip/krip_file/1473/A2.png
    getKRPFile() {
      return (item) => {
        if (item.files) {
          if (!item.files.includes("https")) {
            return `https://dev-api-appetiser.betalogika.tech/files/${item._id}/${item.files}`;
          }
          return item.files;
        }
        return null;
      };
    },
    isPDF() {
      return (item) => {
        if (item.krip_file?.includes(".pdf")) {
          return true;
        }
        return false;
      };
    },
  },
  mounted() {
    document
      .getElementsByClassName("app-wrapper")[0]
      .addEventListener("scroll", this.scrollCallback);
  },
  created() {
    this.fetchPokemon();
  },
  methods: {
    viewPdf(url) {
      storage.setStorage("pdfUrl", url);
      this.$router.push({ path: "/pdfview" });
    },
    scrollCallback() {
      const element = document.getElementsByClassName("app-wrapper")[0];
      const { scrollTop } = element;
      const { scrollHeight } = element;
      const { clientHeight } = element;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
        if (!this.krip.isLoading && this.krip.nextPageUrl) {
          this.fetchPokemon(this.krip.nextPageUrl);
        }
      }
    },
    fetchPokemon(url) {
      this.krip.isLoading = true;
      apis.krip
        .getKrip(url)
        .then(({ data }) => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Success List Pokemon",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          if (url) {
            this.krip.data = this.krip.data.concat(data.data);
          } else {
            this.krip.data = data.data;
          }
          this.krip.nextPageUrl = data.links.next;
        })
        .finally(() => {
          this.krip.isLoading = false;
        });
    },
    validationForm() {
      this.$refs.formKRIP.validate().then((success) => {
        if (success) {
          this.createTask();
        }
      });
    },

    pokemonModalDetail(id) {
      this.$nextTick(function () {
        this.$bvModal.show("pokemonsDetailData");
      });
      this.pokemonDetail(id);
    },

    pokemonDetail(id) {
      this.$store.commit("app/UPDATE_LOADING_BLOCK", true);
      apis.krip
        .detail(id)
        .then(({ data }) => {
          this.$toast({
            component: ToastificationContentVue,
            props: {
              title: "Success Detail Pokemon",
              icon: "CheckIcon",
              variant: "success",
            },
          });
          this.detailPokemon = data.data;
          this.fetchKrips();
        })
        .catch((error) => {
          this.errorHandler(error, "Failed Pokemon detail, Please Try Again");
          console.log(error.response.data);
        })
        .finally(() => {
          this.$store.commit("app/UPDATE_LOADING_BLOCK", false);
        });
    },
    onChangeFileBerkas(e) {
      const { files } = e.target;
      if (files.length) {
        this.createImage(files[0], (result) => {
          this.fileBerkas = result;
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
  },
};
</script>

<style></style>
