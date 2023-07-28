import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";
import { CardIndex } from "./components/cardIndex";
/*import './App.css'*/

const defaultTodos = [
  { text: "Cortar cebolla", completed: true },
  { text: "Tomar curso de React", completed: false },
  { text: "Llorar con la llorona", completed: false },
];

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState("");

  // Contador de todos completados
  const completedTodos = todos.filter((todo) => todo.completed).length;

  const totalTodos = todos.length;

  let searchedTodos = [];

  //Buscar un todo en especifico
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLocaleLowerCase();
      return todoText.includes(searchText);
    });
  }

  // Al hacer click en el icono de check, se cambia el estado de completed a true
  //Los tres puntos son para hacer una copia del arreglo y no modificar el original
  const completeTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    setTodos(newTodos);
  };

  const deleteTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  if (totalTodos > 0) {
    return (
      <React.Fragment>
        <CardIndex
          percentage={((completedTodos / totalTodos) * 100).toFixed(2)}
        >
          <TodoCounter total={totalTodos} completed={completedTodos} />
          <TodoSearch
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <TodoList>
            {searchedTodos.map((todo) => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodos(todo.text)}
                onDelete={() => deleteTodos(todo.text)}
              />
            ))}
          </TodoList>
          <CreateTodoButton />
        </CardIndex>
      </React.Fragment>
    );
  }
}
export default App;
