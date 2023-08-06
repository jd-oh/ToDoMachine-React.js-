import React from "react";
import "../styles/TodoCounter.css";

function TodoCounter({ total, completed, onAllCompletedTodos }) {
  return (
    <div>
      <h2 className="TodoCounter">
        Has completado {completed} de {total} TODOs
      </h2>
      <h2 className="AllCompletedTodos" onChange={onAllCompletedTodos}>
        ¡Felicidades! Has completado todos tus ToDo's
      </h2>
    </div>
  );
}

export { TodoCounter };
