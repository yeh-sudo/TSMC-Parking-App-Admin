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
            <button id="SearchButton" class="btn btn-danger" type="submit" @click.prevent="searchButtonClick">Search</button>
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
          :nick-name="user.nickName"
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
      users: [
        {
          id: "ChengShianYeh",
          name: "Cheng Shian Yeh",
          nickName: "yeh-sudo",
          email: "f74091289@gs.ncku.edu.tw",
          phoneNumber: "0966227782",
          userType: "Normal",
        },
        {
          id: "LebronJames",
          name: "Lebron James",
          nickName: "Lebron",
          email: "lebron@gmail.com",
          phoneNumber: "0988 889 888",
          userType: "Normal",
        },
      ],
    };
  },
  methods: {
    searchButtonClick: function() {
      // fetch user api to search user
      console.log("hello, " + this.searchInput);
      this.searchInput = "";
    }
  }
};
</script>

<style>
</style>
