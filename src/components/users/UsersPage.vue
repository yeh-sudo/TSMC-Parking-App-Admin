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
      <!-- Put users here -->
      <div class="accordion" id="accordionFlushExample">
        <user
          v-for="(user, index) in users"
          :key="user.id"
          :name="user.name"
          :index="index"
          :email="user.email"
          :phone-number="user.phoneNumber"
          :user-type="user.userType"
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
    };
  },
  methods: {
    searchButtonClick: function () {
      // fetch user api to search user
      console.log("hello, " + this.searchInput);
      this.searchInput = "";
    },
    loadUserData: async function () {
      await fetch("http://165.22.58.21:3000/all-user")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          const users = [];
          for (let element of result.data) {
            let carArr = [];
            for (let car of element.cars) {
              carArr.push(car[0]);
            }
            let carJson = [];
            for (let i = 0; i < carArr.length; i++) {
              carJson.push({
                id: i,
                car: carArr[i],
              });
            }
            console.log(carJson);
            users.push({
              id: element.userId,
              name: element.account,
              email: element.email,
              phoneNumber: element.tele,
              userType: element.group,
              cars: carArr,
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
