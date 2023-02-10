<template>
  <li class="list-group-item">
    <ul>
      <li><strong>Name:</strong> {{ name }}</li>
      <li><strong>Email:</strong> {{ email }}</li>
      <li><strong>Plate:</strong> {{ plate }}</li>
      <li><strong>Entry Time:</strong> {{ entry }}</li>
      <li><strong>Leave Time:</strong> {{ leave }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ["name", "email", "entry", "leave", "plate"],
};
</script>

<style></style>
