
import { configureStore } from '@reduxjs/toolkit';
import TodoListRd from './reducers/todoListReducer'

const store = configureStore({
    reducer:{
        todoListReducer: TodoListRd,
    }
})

export default store