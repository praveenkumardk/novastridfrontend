import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    items:[],
    loading: false,
    error: null
}

let API_URL = '/data.json'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');  // Throw error if response is not OK
      }
      console.log("fetch todods", response)
      const data = await response.json();
      return data;
    }
  );

const TodoListReducer = createSlice({
    name:"todolsit",
    initialState:initialState,
    reducers:{
        addTodo:(state, action)=>{
            // console.log("state--->", state.items)
            console.log("action--->", action.payload)
            let dup = [...state.items]
            console.log('state---->', initialState)
            state.items.push(action.payload)
        },
        updateStatus:(state, action)=>{
            console.log("---satate--->", state)
            console.log("---action--->", action)
            state.items = state.items.map((value)=>{
               if(value.id == action.payload.id){
                value.status = true
               }
               return value
            })
        },
        deleteTodo:(state, action)=>{
            state.items = state.items.filter((value)=>{
                if(value.id !== action.payload.id){
                    return value
                }
            })
        }
    },
    extraReducers: (builder) => {
        // Handle the three states of the async action (fetching todos)
        builder
          .addCase(fetchTodos.pending, (state) => {
            state.loading = true;
            console.log("pending-->")
          })
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            console.log("fulfilled--->", action.payload)
            state.items = action.payload.data; // Set fetched todos in state
          })
          .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; // Store any error that occurs
          });
      },
})

export const {addTodo, updateStatus, deleteTodo} = TodoListReducer.actions

export default TodoListReducer.reducer