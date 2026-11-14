
<script setup lang="ts">
withDefaults(
  defineProps<{
    padding?: 'small' | 'medium' | 'large'
    hoverable?: boolean
  }>(),
  {
    padding: 'medium',
    hoverable: false,
  },
)
</script>

<template>
  <article
    class="base-card"
    :class="[
      `card-${padding}`,
      { 'card-hoverable': hoverable },
    ]"
  >
    <slot />
  </article>
</template>

<style scoped>
.base-card {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-small {
  padding: 12px;
}

.card-medium {
  padding: 20px;
}

.card-large {
  padding: 28px;
}

.card-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
</style>
