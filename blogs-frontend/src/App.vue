
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-wrapper">
    <RouterView />
  </div>
</template>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
