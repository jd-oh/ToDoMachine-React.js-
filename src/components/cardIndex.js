import React from "react";
import "../styles/CardIndex.css";

function CardIndex(props) {
  return (
    <div className="card">
      <div className="card__title">{props.children}</div>
      <div className="card__indicator">
        <span className="card__indicator-percentage">
          {props.percentage}% Completado
        </span>
      </div>
      <div className="card__progress">
        <progress max="100" value={props.percentage}></progress>
      </div>
    </div>
  );
}

export { CardIndex };
