
<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppNavbar from '../components/common/AppNavbar.vue'
import AppFooter from '../components/common/AppFooter.vue'
import NotificationContainer from '../components/common/NotificationContainer.vue'
</script>

<template>
  <div class="public-layout">
    <AppNavbar />

    <main class="public-main">
      <RouterView />
    </main>

    <AppFooter />

    <NotificationContainer />
  </div>
</template>

<style scoped>
.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.public-main {
  flex: 1;
  width: 100%;
}
</style>
