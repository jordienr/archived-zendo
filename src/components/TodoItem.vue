<template>
    <li 
        class="todo-item" 
        :class="{done: isDone, tap: selected}" 
        v-touch-class="'tap'"
        @click.stop="tap"
        v-touch:touchhold.stop="hold"
        >
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
    selected: false
}),
methods: {
    tap(e) {
        console.log(e)
        this.selected = true
        this.$emit('tap')
        setTimeout(() => {
            this.selected = false
        }, 300)
    },
    hold(e) {
        console.log('hold', e)
        this.selected = true
        this.$emit('hold')
    }
},
updated() {
    this.selected = false
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