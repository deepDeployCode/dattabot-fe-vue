<template>
  <PokemonChart />
</template>

<script>
import apis from "@/api";
import { BRow, BCol } from "bootstrap-vue";
import PokemonChart from "@/components/data-visualization/BaseDataVisualization.vue";

export default {
  components: {
    BRow,
    BCol,
    PokemonChart,
  },
  data() {
    return {};
  },

  computed: {},
  methods: {},
  created() {},
};
</script>
