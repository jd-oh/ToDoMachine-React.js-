import React from "react";

function useLocalStorage(itemName, initialValue) {
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);

        let parsedItems;

        // Si no hay nada en el localStorage, se crea un arreglo vacio y se convierte a string
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItems = initialValue;
          // Si hay algo en el localStorage, se convierte a un arreglo lo que hay en el localStorage
        } else {
          parsedItems = JSON.parse(localStorageItem);
          setItem(parsedItems);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }, 2000);
  }, []);

  //Para no solo actualizar el estado, sino tambien el localStorage
  const saveItem = (newItems) => {
    const stringifiedTodos = JSON.stringify(newItems);
    localStorage.setItem(itemName, stringifiedTodos);
    setItem(newItems);
  };

  //En los hooks siempre se debe retornar algo
  return { item, saveItem, loading, error };
}
export { useLocalStorage };
