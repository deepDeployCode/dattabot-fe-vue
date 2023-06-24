<template>
  <div class="app-wrapper">
    <BaseNavigation />
    <DividerNavigation />
    <div class="p-2 mx-auto">
      <div
        style="font-weight: 500; font-size: 1.1rem"
        class="mb-1 pointer"
        @click="$router.push({ path: '/' })">
        Beranda
      </div>
      <hr v-show="!isVisibleCollapseTentang" />
      <div
        style="font-weight: 500; font-size: 1.1rem"
        class="mb-1 pointer"
        @click="$router.push({ path: '/webinar' })">
        Webinar
      </div>
      <hr v-show="!isVisibleCollapseTentang" />
      <app-collapse class="p-0 mb-1">
        <app-collapse-item
          title="Tentang"
          class="shadow-none p-0"
          @visible="visibleCollapsTentang">
          <div
            style="line-height: 1.5; padding: 0.75rem 1.25rem"
            class="border-bottom pointer">
            Profil IDI Cabang
          </div>
          <div
            style="line-height: 1.5; padding: 0.75rem 1.25rem"
            class="border-bottom pointer"
            @click="$router.push({ path: '/tentang/susunan-pengurus' })">
            Susunan Pengurus
          </div>
          <div
            style="line-height: 1.5; padding: 0.75rem 1.25rem"
            class="border-bottom pointer"
            @click="$router.push({ path: '/tentang/galery' })">
            Galeri
          </div>
        </app-collapse-item>
      </app-collapse>
      <hr v-show="!isVisibleCollapseTentang" />
      <div
        style="font-weight: 500; font-size: 1.1rem"
        class="mb-1 pointer"
        @click="$router.push({ path: '/berkas' })">
        Berkas
      </div>
      <hr />
      <div
        style="font-weight: 500; font-size: 1.1rem"
        class="mb-1 pointer"
        @click="logout">
        Logout
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import BaseNavigation from "@/components/Base/BaseNavigation.vue";
import DividerNavigation from "@/components/Base/DividerNavigation.vue";
import AppCollapse from "@core/components/app-collapse/AppCollapse.vue";
import AppCollapseItem from "@core/components/app-collapse/AppCollapseItem.vue";
import storage from "@/helpers/storage";
import ToastificationContentVue from "@/@core/components/toastification/ToastificationContent.vue";

export default {
  components: {
    BaseNavigation,
    DividerNavigation,
    AppCollapse,
    AppCollapseItem,
  },
  data() {
    return {
      isVisibleCollapseTentang: false,
    };
  },
  methods: {
    visibleCollapsTentang(val) {
      this.isVisibleCollapseTentang = val;
    },
    logout() {
      storage.clearStorage();
      this.$toast({
        component: ToastificationContentVue,
        props: {
          title: "Logout berhasil",
          icon: "CheckIcon",
          variant: "success",
        },
      });
      this.$router.push({ path: "/login", replace: true });
    },
  },
};
</script>

<style></style>
