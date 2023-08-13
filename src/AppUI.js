import { TodoCounter } from "./components/TodoCounter";
import { TodoSearch } from "./components/TodoSearch";
import { TodoList } from "./components/TodoList";
import { TodoItem } from "./components/TodoItem";
import { CreateTodoButton } from "./components/CreateTodoButton";
import { CardIndex } from "./components/cardIndex";
import React from "react";

function AppUI({
  loading,
  error,
  completeTodos,
  deleteTodos,
  totalTodos,
  completedTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  allCompletedTodos,
}) {
  return (
    <React.Fragment>
      <CardIndex percentage={((completedTodos / totalTodos) * 100).toFixed(2)}>
        <TodoCounter
          total={totalTodos}
          completed={completedTodos}
          onAllCompletedTodos={() => allCompletedTodos()}
        />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoList>
          {loading && <p>Cargando...</p>}
          {error && <p>Hubo un error</p>}
          {!loading && searchedTodos.length === 0 && (
            <p>¡Crea tu primer TODO!</p>
          )}

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
export { AppUI };
