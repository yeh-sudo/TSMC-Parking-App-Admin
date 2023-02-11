<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" style="font-size: 30px">Users Data</a>
          <div class="d-flex">
            <div class="d-flex justify-content-center h-100">
              <div class="searchbar">
                <input
                  class="search_input"
                  type="text"
                  name=""
                  placeholder="Search..."
                  v-model="searchInput"
                />
                <a
                  href="#"
                  class="search_icon"
                  @click.prevent="searchButtonClick"
                >
                  <span class="material-icons"> search </span>
                </a>
              </div>
            </div>
          </div>
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

<style scoped>
.searchbar {
  margin-bottom: auto;
  margin-top: auto;
  height: 60px;
  background-color: #353b48;
  border-radius: 30px;
  padding: 10px;
}

.search_input {
  color: white;
  border: 0;
  outline: 0;
  background: none;
  width: 0;
  caret-color: transparent;
  line-height: 40px;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_input {
  padding: 0 10px;
  width: 450px;
  caret-color: red;
  transition: width 0.4s linear;
}

.searchbar:hover > .search_icon {
  background: white;
  color: red;
}

.search_icon {
  height: 40px;
  width: 40px;
  float: right;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: white;
  text-decoration: none;
}
</style>
