<template>
  <div class="navigation-wrapper px-2 py-1 bg-danger text-white">
    <div class="navigation-name">
      <div v-if="isBack" class="navigation-back pr-1" @click="$router.go(-1)">
        <feather-icon icon="ArrowLeftIcon" size="22" stroke-width="2" />
      </div>
      <div class="nav-title">
        <!-- {{ title }} -->
        <b-img :src="logo" alt="logo" height="30" />
      </div>
    </div>
    <div v-if="isNavMenu" class="navigation-menu">
      <div class="notif-menu pr-1">
        <feather-icon
          icon="BellIcon"
          :badge="handlerBellNotification"
          badge-classes="bg-warning"
          size="22"
          stroke-width="2"
          @click="$router.push({ path: '/notifikasi' })"
        />
      </div>
      <div class="menu" @click="$router.push({ path: '/menu' })">
        <feather-icon icon="MenuIcon" size="22" stroke-width="2" />
      </div>
    </div>
  </div>
</template>
<script>
import { BImg } from "bootstrap-vue";
import apis from "@/api";

export default {
  components: {
    BImg,
  },
  data() {
    return {
      // eslint-disable-next-line global-require
      logo: require("@/assets/images/icons/simfoni_putih.png"),
      notifikasi: {
        isLoading: false,
        count: 0,
      },
    };
  },
  mounted() {
    this.showCountNotification();
  },
  computed: {
    title() {
      return this.$route.meta?.title || "SIMFONI";
    },
    isBack() {
      return this.$route.meta?.isBack === undefined
        ? true
        : this.$route.meta?.isBack;
    },
    isNavMenu() {
      return this.$route.meta?.isNavMenu === undefined
        ? true
        : this.$route.meta?.isNavMenu;
    },
    handlerBellNotification() {
      return this.notifikasi.count.toString(); //count notification and convert to sting
    },
  },
  methods: {
    showCountNotification() {
      this.notifikasi.isLoading = true;
      apis.profile
        .notificationCount()
        .then(({ data }) => {
          this.notifikasi.count = data.data;
          console.log({ totalNotif: this.notifikasi.count });
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.notifikasi.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.navigation-wrapper {
  z-index: 500;
  position: fixed;
  width: 478px;
  top: 0;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 640px) {
  .navigation-wrapper {
    width: 100vw !important;
  }
}

.navigation-name {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navigation-back {
  cursor: pointer;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
}

.navigation-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.notif-menu,
.menu {
  cursor: pointer;
}
</style>
