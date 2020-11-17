<template>
  <div class="settings container">
    <div class="header">
      <h1>Settings</h1>
      <div class="divider"></div>
    </div>
    <div class="body">
      <div class="section-title">
        <h2>Date format</h2>
      </div>
      <div class="divider"></div>
      <div class="input">
        <p>15.11.2020</p>
      </div>
      <div class="input">        
        <p>Thursday, November 12, 2020</p>
      </div>
      <div class="input">
        <p>Show year</p>
        <p>Yes</p>
      </div>
      <div class="divider"></div>
      <div class="section-title">
        <h2>Theme</h2>
      </div>
      <div class="divider"></div>
      <div class="input">
        <p>Light theme</p>
      </div>
      <div class="input">
        <p>Dark theme</p>
      </div>
      <div class="divider"></div>
      <div class="section-title">
        <h2>Shortcuts</h2>
      </div>
      <div class="divider"></div>
      <div class="input">
        <p>Delete all todos</p>
      </div>
      <div class="input">
        <p>Mark all as done</p>
      </div>
    </div>
    <footer class="actions">
      <button @click="$router.push('/')">Cancel</button>
      <button class="bold">Save</button>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.input {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin: 0;
  * {
    margin: 0;
    padding: 1rem 0;
  }
}
.section-title {
  h2 {
    font-family: $sans-serif;
    font-size: $text-sm;
    font-weight: bold;
    padding: 0 1rem;
    margin: 0;
    }
}
.header {
  border-bottom: 1px solid $gray-300;
}
.body {
  padding-bottom: 4rem;
  padding-top: 1rem;
}
.actions {
  border-top: 1px solid $gray-300;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  button {
    background-color: transparent;
    border: none;
    font-size: $text-md;
    padding: 1rem;
  }
}
</style>
