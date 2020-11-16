<template>
  <div id="app">
    <div v-if="loading" class="loading">
      <h1>zendō</h1>
      <p>Task list</p>
    </div>
    <div v-else>
      <div id="nav">
        <router-link to="/settings">···</router-link>
      </div>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    loading: true
  }),
  created() {
    setTimeout(() => this.loading = false, 800)
  }
}
</script>

<style lang="scss">
@import '@/scss/main.scss';

div {
  user-select: none;
}

#nav {
  display: flex;
  padding: 1rem;
  justify-content: flex-end;
  a {
    padding: 1rem;
    text-decoration: none;
    font-size: 1.5rem;
    color: $gray-600;
  }
}

.loading {
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    font-style: italic;
  }
  p {
    margin: .5rem;
    font-weight: lighter;
  }
}
.header {
  margin-top: 72px;
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  width: 100vw;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  filter: blur(2px)
}
</style>
