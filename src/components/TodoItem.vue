<template>
  <li class="todo-item" :class="{done: isDone, tap: hasBeenTapped}" v-touch:tap="clickHandler">
      <slot></slot>
  </li>
</template>

<script>
export default {
name: 'TodoItem',
props: {
    isDone: Boolean
},
data: () => ({
    hasBeenTapped: false
}),
methods: {
    clickHandler() {
        this.$emit('tap')
        this.hasBeenTapped = true
        setTimeout(() => {
            this.hasBeenTapped = false
        }, 200)

    }
}
}
</script>

<style lang="scss">
.todo-item {
    user-select: none;
}
.done {
    text-decoration: line-through;
    color: $gray-600;
    transition: .2s;
}
.tap {
    transition: .2s;
    background-color: #fff;
}
</style>