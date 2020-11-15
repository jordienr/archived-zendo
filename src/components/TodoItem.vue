<template>
    <li class="todo-item" :class="{done: isDone, tap: hasBeenTapped}" v-touch:tap.self="tapHandler" v-touch:touchhold.self="holdHandler">
        {{text}}
    </li>
</template>

<script>
export default {
name: 'TodoItem',
props: {
    isDone: Boolean,
    text: String
},
data: () => ({
    hasBeenTapped: false
}),
methods: {
    tapHandler() {
        this.$emit('tap')
        this.hasBeenTapped = true
        setTimeout(() => {
            this.hasBeenTapped = false
        }, 200)

    },
    holdHandler() {
        this.$emit('hold')
    }
}
}
</script>

<style lang="scss">
.todo-item {
    user-select: none;
    transition: .2s;
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