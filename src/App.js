import "./App.css";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

import { Provider } from "react-redux";

import { store } from "./redux/store";

// Creating a store and passing todo reducer


function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <main className="main">
          <TodoInput />
          <TodoList />
        </main>
      </Layout>
    </Provider>
  );
}

export default App;
