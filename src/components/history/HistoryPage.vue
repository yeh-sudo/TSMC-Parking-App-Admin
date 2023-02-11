<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" style="font-size: 30px">History</a>
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
                <a href="#" class="search_icon" @click.prevent="searchParking">
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
      <!-- Put history list here -->
      <div class="overflow-auto" v-if="!isLoading">
        <ul class="list-group">
          <historyList
            v-for="item in parkingList"
            :key="item.id"
            :name="item.name"
            :email="item.email"
            :entry="item.entry"
            :leave="item.leave"
            :plate="item.plate"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import historyList from "./historyList.vue";

export default {
  components: {
    historyList,
  },
  data() {
    return {
      searchInput: "",
      isLoading: false,
      parkingList: [],
    };
  },
  methods: {
    searchParking: async function () {
      this.isLoading = true;
      if (this.searchInput === "") {
        this.isLoading = false;
        return;
      }
      const searchStr = this.searchInput.replace("-", "/").trim();
      this.searchInput = "";
      await fetch("http://165.22.58.21:3000/parking/history/" + searchStr)
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          this.isLoading = false;
          let parkingList = [];
          for (let element of result.data) {
            parkingList.push({
              name: element.account,
              email: element.email,
              entry: element.entry_time,
              leave: element.leave_time,
              plate: element.license_plate,
              id: element.user_id,
            });
          }
          this.parkingList = parkingList;
        })
        .catch((error) => {
          console.log("Error", error);
        });
    },
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
  width: 200px;
  caret-color: red;
  transition: width 0.2s linear;
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
