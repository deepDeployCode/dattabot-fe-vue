<template>
  <div class="bottom-nav-wrapper px-2 py-1">
    <div
      class="pointer"
      @click="$router.push({ path: '/' })"
    >
      <feather-icon
        icon="HomeIcon"
        size="22"
        stroke-width="2"
        :class="$route.name === 'beranda' ? 'text-danger' : ''"
      />
    </div>
    <div
      class="pointer"
      @click="$router.push({ path: '/studi-kasus' })"
    >
      <feather-icon
        icon="MessageSquareIcon"
        size="22"
        stroke-width="2"
        :class="$route.name === 'studi-kasus' ? 'text-danger' : ''"
      />
    </div>
    <div
      class="pointer"
      @click="$router.push({ path: '/profile' })"
    >
      <feather-icon
        icon="UserIcon"
        size="22"
        stroke-width="2"
        :class="$route.name === 'profile' ? 'text-danger' : ''"
      />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

  .bottom-nav-wrapper {
    position: fixed;
    bottom: 0;
    z-index: 500;
    background-color: #F7F7F8;
    color: #000000;
    width: 478px;
    display: flex;
    justify-content: space-around;
  }

@media (max-width: 640px) {
  .bottom-nav-wrapper {
    width: 100vw !important;
  }
}

</style>
