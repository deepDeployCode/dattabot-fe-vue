<template>
  <div class="bottom-nav-wrapper px-2 py-1">
    <div>
      <feather-icon
        icon="HomeIcon"
        size="22"
        stroke-width="2"
        class="text-danger"
      />
    </div>
    <div>
      <feather-icon
        icon="MessageSquareIcon"
        size="22"
        stroke-width="2"
        class="text-danger"
      />
    </div>
    <div>
      <feather-icon
        icon="UserIcon"
        size="22"
        stroke-width="2"
        class="text-danger"
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
