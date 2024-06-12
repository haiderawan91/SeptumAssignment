<template >
  <div class>
    <div class="background-image"></div>
    <div class="content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main-container {
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 60px;
}
.background-image {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 0;
  display: block;
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 60px;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.content {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
  margin-left: 20px;
  margin-right: 20px;
}

.app-container {
  background-color: rgb(4, 4, 56);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
}
.fade-enter-active {
  animation: fade-enter 3s ease-out;
}

.fade-leave-active {
  animation: fade-leave 3s ease-in;
}

@keyframes fade-enter {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-leave {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
body.transition-active {
  overflow: hidden;
}
</style>
