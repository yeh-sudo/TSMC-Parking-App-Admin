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
                />
                <a href="#" class="search_icon">
                  <span class="material-icons"> search </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div class="row">
      <h3 v-if="isLoading">Loading...</h3>
      <!-- Put history list here -->
    </div>
  </div>
</template>

<script>
export default {};
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
