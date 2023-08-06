import React from "react";
import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";
import { CardIndex } from "./components/cardIndex";
/*import './App.css'*/

// const defaultTodos = [
//   { text: "Cortar cebolla", completed: true },
//   { text: "Tomar curso de React", completed: false },
//   { text: "Llorar con la llorona", completed: false },
// ];

// localStorage.setItem("todos", JSON.stringify(defaultTodos));
// localStorage.removeItem("todos");

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);

  let parsedItems;

  // Si no hay nada en el localStorage, se crea un arreglo vacio y se convierte a string
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItems = initialValue;
    // Si hay algo en el localStorage, se convierte a un arreglo lo que hay en el localStorage
  } else {
    parsedItems = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItems);
  //Para no solo actualizar el estado, sino tambien el localStorage
  const saveItem = (newItems) => {
    const stringifiedTodos = JSON.stringify(newItems);
    localStorage.setItem(itemName, stringifiedTodos);
    setItem(newItems);
  };

  //En los hooks siempre se debe retornar algo
  return [item, saveItem];
}
function App() {
  const [todos, saveTodos] = useLocalStorage("todos", []);
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

  //Cuando todos los todos se hayan completados, muestra un mensaje
  const allCompletedTodos = () => {
    if (completedTodos === totalTodos) {
    }
  };

  if (totalTodos > 0) {
    return (
      <React.Fragment>
        <CardIndex
          percentage={((completedTodos / totalTodos) * 100).toFixed(2)}
        >
          <TodoCounter
            total={totalTodos}
            completed={completedTodos}
            onAllCompletedTodos={() => allCompletedTodos()}
          />
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
