import TodoList from "./components/todoList";
import {Provider} from "react-redux"
import store from "./store";

function App() {
  return (
    <Provider store={store}>
       <TodoList/>
    </Provider>
  );
}

export default App;
