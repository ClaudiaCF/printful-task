<template>
  <div class="app">
    <transition name="app__content--animated" mode="out-in" appear>
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
html,
body,
.app,
.app__content {
  height: 100%;
}

.app {
  &__content {
    &--animated {
      @include animation--fade-out-in;
    }
  }
}
</style>
