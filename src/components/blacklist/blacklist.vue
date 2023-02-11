<template>
  <li class="list-group-item">
    <ul>
      <li><strong>Name:</strong> {{ name }}</li>
      <li><strong>Email:</strong> {{ email }}</li>
      <li><strong>Plate:</strong> {{ plate }}</li>
      <li><strong>Blacklist Start Time:</strong> {{ start }}</li>
      <li><strong>Blacklist End Time:</strong> {{ end }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  props: ["name", "email", "start", "end", "plate"],
};
</script>

<style></style>
