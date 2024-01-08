<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav/Nav.vue'
</script>

<template>
  <div class="main">
    <Nav />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  .content {
    width: 1140px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 30px 0;
    padding-top: 90px;
    color: #606266;
  }
}
</style>
