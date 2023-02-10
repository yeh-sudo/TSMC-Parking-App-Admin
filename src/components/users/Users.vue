<template>
  <div class="accordion-item">
    <h2 class="accordion-header" v-bind:id="'heading_' + index">
      <button
        class="accordion-button collapsed bg-dark text-light"
        type="button"
        data-bs-toggle="collapse"
        v-bind:data-bs-target="'#collapse_' + index"
        aria-expanded="false"
        aria-controls="flush-collapseOne"
      >
        <strong>{{ name }}</strong>
      </button>
    </h2>
    <div
      v-bind:id="'collapse_' + index"
      class="accordion-collapse collapse"
      v-bind:aria-labelledby="'heading_' + index"
      data-bs-parent="#accordionFlushExample"
    >
      <div class="accordion-body">
        <ul>
          <li><strong>Email:</strong> {{ email }}</li>
          <li><strong>Phone Number:</strong> {{ phoneNumber }}</li>
          <li><strong>User Type:</strong> {{ userType }}</li>
          <li><strong>Own Cars:</strong> {{ cars }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    email: String,
    phoneNumber: String,
    userType: String,
    cars: String,
    index: Number,
  },
  data() {
    return {
      user: {
        name: "Cheng Shian Yeh",
        nickName: "yeh-sudo",
        email: "f74091289@gs.ncku.edu.tw",
        phoneNumber: "0966227782",
        userType: "Normal",
      },
    };
  },
};
</script>

<style></style>
