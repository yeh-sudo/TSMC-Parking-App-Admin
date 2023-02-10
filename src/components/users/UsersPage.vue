<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" style="font-size: 30px">Users Data</a>
          <form class="d-flex" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchInput"
            />
            <!-- TODO: add search user API -->
            <button
              id="SearchButton"
              class="btn btn-danger"
              type="submit"
              @click.prevent="searchButtonClick"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
    <div class="row">
      <h3 v-if="isLoading">Loading...</h3>
      <!-- Put users here -->
      <div class="accordion" id="accordionFlushExample" v-if="!isLoading">
        <user
          v-for="(user, index) in users"
          :key="user.id"
          :name="user.name"
          :index="index"
          :email="user.email"
          :phone-number="user.phoneNumber"
          :user-type="user.userType"
          :cars="user.cars"
        />
      </div>
    </div>
  </div>
</template>

<script>
import user from "./Users.vue";

export default {
  props: ["results"],
  components: {
    user,
  },
  data() {
    return {
      searchInput: "",
      users: [],
      isLoading: false,
    };
  },
  methods: {
    searchButtonClick: async function () {
      if (this.searchInput === "") {
        this.loadUserData();
        return;
      }
      this.isLoading = true;
      await fetch("http://165.22.58.21:3000/user/search/" + this.searchInput)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoading = false;
          const users = [];
          for (let element of result.data) {
            if (element.group === "Admin") {
              continue;
            }
            let carStr = "";
            for (let i = 0; i < element.cars.length; i++) {
              carStr += element.cars[i][0];
              if (i != element.cars.length - 1) {
                carStr += ", ";
              }
            }
            users.push({
              id: element.userId,
              name: element.account,
              email: element.email,
              phoneNumber: element.tele,
              userType: element.group,
              cars: carStr,
            });
          }
          this.users = users;
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    },
    loadUserData: async function () {
      this.isLoading = true;
      await fetch("http://165.22.58.21:3000/user/all")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoading = false;
          const users = [];
          for (let element of result.data) {
            if (element.group === "Admin") {
              continue;
            }
            let carStr = "";
            for (let i = 0; i < element.cars.length; i++) {
              carStr += element.cars[i][0];
              if (i != element.cars.length - 1) {
                carStr += ", ";
              }
            }
            users.push({
              id: element.userId,
              name: element.account,
              email: element.email,
              phoneNumber: element.tele,
              userType: element.group,
              cars: carStr,
            });
          }
          this.users = users;
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    },
  },
  mounted() {
    this.loadUserData();
  },
};
</script>

<style></style>
