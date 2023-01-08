<template>
  <div class="navigation-wrapper px-2 py-1">
    <div
      class="navigation-back pr-1"
      @click="$router.go(-1)"
    >
      <feather-icon
        icon="ArrowLeftIcon"
        size="22"
        stroke-width="2"
      />
    </div>
    <div class="nav-title">
      {{ title }}
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$route.meta?.title || 'SIMFONI'
    },
  },
}
</script>

<style scoped>

.navigation-wrapper {
  background-color: #F7F7F8;
  color: #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 500;
  position: fixed;
  width: 478px;
  top: 0;
}

.navigation-back {
  cursor: pointer;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
}

</style>
