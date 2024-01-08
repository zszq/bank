<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const menus = [
  { icon: new URL('/src/assets/images/dashboard.png', import.meta.url).href, name: 'Dashboard', path: '/dashboard' },
  { icon: new URL('/src/assets/images/banking.png', import.meta.url).href, name: 'Banking', path: '/banking/self/account/BUS_USD_Account' }
]

let activate = ref('')

watch(route, (newRoute) => {
  activate.value = newRoute.path
})

function navigation(path: string) {
  activate.value = path
  router.push(path)
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <a class="log">
        <img src="@/assets/images/frontend.png" alt="" />
        <div class="top-title">FV Bank</div>
      </a>
      <div class="menu">
        <div v-for="(item, index) in menus" :key="index" class="menu-item" :class="[activate == item.path ? 'active' : '']" @click="navigation(item.path)">
          <img :src="item.icon" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="account">
        <div class="user">
          <img src="@/assets/images/user.svg" alt="" />
          <span>Matthe..</span>
        </div>
        <div class="logout">
          <img src="@/assets/images/logout.svg" alt="" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  background-color: #0278ae;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .navbar-container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .log {
      height: 100%;
      padding: 0 30px;
      display: flex;
      align-items: center;
      img {
        max-width: 64px;
        max-height: 32px;
        margin-right: 0.7rem;
      }
    }
    .menu {
      // background-color: #9c7171;
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .menu-item {
        height: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        position: relative;
        margin-right: 8px;
        img {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        @mixin after {
          content: '';
          width: 100%;
          height: 4px;
          background-color: #fff;
          opacity: 0.6;
          position: absolute;
          left: 0;
          bottom: 0;
        }
        &:hover {
          cursor: pointer;
          &::after {
            @include after;
          }
        }
        &.active::after {
          @include after;
        }
      }
    }
    .divider {
      width: 0;
      height: 50%;
      margin: 0 1.2rem;
      border-left: 1px solid white;
      opacity: 0.3;
    }
    .account {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      .user {
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
      .logout {
        @extend .user;
        margin-left: 15px;
      }
    }
  }
}
</style>
