<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <Component :is="Component" />
    </transition>
  </router-view>
</template>

<script></script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "poppins", sans-serif;
  font-weight: 400;
}

:root {
  --primary: #4ade80;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}
body {
  background: var(--light);
}
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
#app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>
