<template>
  <sidebar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import sidebar from "../sidebar/sidebar.vue";

export default {
  components: {
    sidebar,
  },
};
</script>

<style lang="scss"></style>
