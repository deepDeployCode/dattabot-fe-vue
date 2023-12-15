<template>
  <b-card v-if="highScores" class="card-tiny-line-stats" body-class="pb-50">
    <h6>High Scores Pokemon</h6>
    <h2 class="font-weight-bolder mb-1">Grafik Waves</h2>
    <!-- chart -->
    <vue-apex-charts
      height="120"
      :options="statisticsProfit.chartOptions"
      :series="highScores.pokemon"
    />
  </b-card>
</template>

<script>
import { BCard } from "bootstrap-vue";
import VueApexCharts from "vue-apexcharts";
import { $themeColors } from "@themeConfig";

const $trackBgColor = "#EBEBEB";

export default {
  components: {
    BCard,
    VueApexCharts,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      highScores: {
        pokemon: [{ data: [20, 12, 29, 12] }],
      },
      statisticsProfit: {
        chartOptions: {
          chart: {
            type: "line",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            borderColor: $trackBgColor,
            strokeDashArray: 5,
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
            padding: {
              top: -30,
              bottom: -10,
            },
          },
          stroke: {
            width: 3,
          },
          colors: [$themeColors.info],
          markers: {
            size: 2,
            colors: $themeColors.info,
            strokeColors: $themeColors.info,
            strokeWidth: 2,
            strokeOpacity: 1,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [
              {
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: "#ffffff",
                strokeColor: $themeColors.info,
                size: 5,
              },
            ],
            shape: "circle",
            radius: 2,
            hover: {
              size: 3,
            },
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                fontSize: "0px",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            show: false,
          },
          tooltip: {
            x: {
              show: false,
            },
          },
        },
      },
    };
  },
  methods: {},
  computed: {},
  mounted() {},
  created() {},
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/dashboard-ecommerce.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
</style>
