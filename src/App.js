import { AppUI } from "./AppUI";
import { useLocalStorage } from "./hooks/useLocalStorage";
import React from "react";
/*import './App.css'*/

// const defaultTodos = [
//   { text: "Cortar cebolla", completed: true },
//   { text: "Tomar curso de React", completed: false },
//   { text: "Llorar con la llorona", completed: false },
// ];

// localStorage.setItem("todos", JSON.stringify(defaultTodos));
// localStorage.removeItem("todos");

function App() {
  //Los dos puntos son para renombrar la variable (alias)
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("todos", []);
  //const [todos, setTodos] = React.useState(parsedTodos);
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
    saveTodos(newTodos);
  };

  const deleteTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);

    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <AppUI
      loading={loading}
      error={error}
      completeTodos={completeTodos}
      deleteTodos={deleteTodos}
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
    />
  );
}
export default App;
