<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" style="font-size: 30px">Blacklist</a>
        </div>
      </nav>
    </div>
    <div class="row">
      <div v-if="isLoading">
        <p class="placeholder-wave">
          <span class="placeholder col-12"></span>
        </p>
        <p class="placeholder-wave">
          <span class="placeholder col-12"></span>
        </p>
        <p class="placeholder-wave">
          <span class="placeholder col-12"></span>
        </p>
      </div>
      <!-- Put blacklist here -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isLoading: false,
      blacklist: [],
    };
  },
  methods: {
    
  },
  mounted() {

  }
};
</script>
