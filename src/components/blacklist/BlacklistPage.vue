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
      <div class="overflow-auto" v-if="!isLoading">
        <ul class="list-group">
          <blacklist
            v-for="item in blacklist"
            :key="item.id"
            :name="item.name"
            :email="item.email"
            :start="item.start"
            :end="item.end"
            :plate="item.plate"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import blacklist from "./blacklist.vue";

export default {
  components: {
    blacklist,
  },
  data() {
    return {
      isLoading: false,
      blacklist: [],
    };
  },
  methods: {
    loadBlacklist: async function () {
      this.isLoading = true;
      await fetch("http://165.22.58.21:3000/black")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoading = false;
          let blacklist = [];
          for (let element of result.data) {
            blacklist.push({
              name: element.account,
              email: element.email,
              start: element.black_start_time,
              end: element.black_end_time,
              plate: element.license_plate,
              id: element.user_id,
            });
          }
          this.blacklist = blacklist;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
  },
  mounted() {
    this.loadBlacklist();
  },
};
</script>
