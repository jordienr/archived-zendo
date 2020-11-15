import Localbase from 'localbase'


const db = new Localbase('db')

export const getTodos = () => db.collection('todos').get().then(todos => todos)

export const addTodo = (todo) => db.collection('todos').add(todo).then(item => item)

export const updateTodo = (id, newData) => db.collection('todos').doc({ id: id }).update(newData)

export const deleteTodo = (id) => db.collection('todos').doc({ id: id }).delete()