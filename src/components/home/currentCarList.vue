<template>
  <li class="list-group-item">
    <ul>
      <li><strong>Name:</strong> {{ userName }}</li>
      <li><strong>Email:</strong> {{ email }}</li>
      <li><strong>Plate:</strong> {{ car }}</li>
      <li><strong>Parking Place</strong> {{ parkingPlace }}</li>
      <li><strong>Entry Time:</strong> {{ time }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ["userName", "email", "car", "parkingPlace", "time"],
};
</script>

<style></style>
