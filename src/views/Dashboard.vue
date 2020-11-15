<template>
  <div class="dashboard container">
    <div class="header">
      <h1>{{today}}</h1>
      <div class="divider"></div>
    </div>
    <div class="body">
      <ul class="todos">
        <TodoItem
          v-for="{ id, text, isDone } in pendingTodos"
          :isDone="isDone"
          v-bind:key="id"
          @tap="markAsDone(id, isDone)"
          v-touch:touchhold="() => touchHoldHandler(id, text)"
          >
          {{text}}
        </TodoItem>

          <div class="divider" v-show="pendingTodos.length && doneTodos.length"></div>      

        <TodoItem
          v-for="{ id, text, isDone } in doneTodos"
          :ref="id"
          :isDone="isDone"
          v-bind:key="id"
          @tap="markAsDone(id, isDone)"
          v-touch:touchhold="() => touchHoldHandler(id, text)"
          >
          {{text}}
        </TodoItem>      
      </ul>
    </div>
    <div class="footer">
      <div class="new-todo">
        <input type="text" name="new" placeholder="New todo" id="new" v-model="newTodo">
        <button @click.prevent="addTodo">
          <AddIcon size="14" color="$gray-900"/>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <transition name="slide-fade">
    <div class="modal" v-if="modal.show">
      <div class="message">
        <component v-if="modal.icon" v-bind:is="modal.icon" color="white" size="20"></component>
        <p>{{ this.modal.text}}</p>
      </div>
      <div class="actions" v-if="modal.actions">
        <button @click="modal = false">No</button>
        <button @click="deleteTodo">Yes, delete it</button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem.vue'
import { AddIcon, CircleCheckIcon, CircleWarningIcon } from 'vue-mono-icons'
import { getTodos, addTodo, updateTodo, deleteTodo } from '@/db'
export default {
  name: 'Home',
  components: {
    TodoItem,
    AddIcon
  },
  data: () => ({
    today: '14, November',
    todos: [],
    newTodo: '',
    modal: {
      show: false,
      text: '',
      icon: undefined,
      actions: false
    },
    selectedTodo: {},
    success: false
  }),
  methods: {
    async markAsDone(id, isDone) {
      await updateTodo(id, {
        isDone: !isDone
      })
      await this.getTodos()
    },
    addTodo() {
      if (this.newTodo.length) {
        addTodo({
          id: this.todos.length,
          text: this.newTodo,
          isDone: false
        }).then(() => this.getTodos())
        this.newTodo = ''
      }
    },
    async getTodos() {
      this.todos = await getTodos()
    },
    touchHoldHandler(id, text) {
      this.selectedTodo = {
        id: id,
        text: text
      }
      this.modal = {
        show: true,
        text: `Are you sure you want to delete "${this.selectedTodo.text}"?`,
        actions: true,
        icon: CircleWarningIcon
      }
    },
    async deleteTodo() {
      await deleteTodo(this.selectedTodo.id)
      await this.getTodos()
      this.modal.icon = CircleCheckIcon
      this.modal.text = 'The item was deleted'
      this.modal.actions = false
      setTimeout(() => {
        this.modal.show = false
      }, 1000)
    }
  },
  computed: {
    doneTodos() {
      return this.todos.filter(item => item.isDone === true)
    },
    pendingTodos() {
      return this.todos.filter(item => item.isDone === false)
    }
  },
  async mounted() {
    this.getTodos()
  }
}
</script>
<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 75px);
  width: 100vw;
}

.todos {
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    padding: 1rem 2rem;
  }
}

.footer {
  text-align: center;
  padding: 1rem;
  margin-top: auto;
  margin-bottom: 4rem;
  .new-todo {
    input, button {
      padding: 1rem;
      min-width: 44px;
      border: none;
      background-color: $gray-300;
      color: $gray-900;
      font-size: 17px;
    }
    input {
      border-radius: 4px 0 0 4px;
    }
    button {
      border-radius: 0 4px 4px 0;
    }
  }
}

.modal {
  position: fixed;
  bottom: 4rem;
  left: 1rem;
  right: 1rem;
  background-color: $gray-900;
  border-radius: 4px;
  .message {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    .mono-icon {
      margin-right: 1rem;
    }
    p {
      color: $gray-100;
      font-size: $text-md;
    }
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  button {
    padding: 1rem;
    border: none;
    background-color: transparent;
    font-size: $text-md;
    color: $gray-100;
  }
  button:last-of-type {
    font-weight: bold;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>