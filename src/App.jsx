/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // If editingIndex is not null, update the existing todo
      const updatedTodos = [...todos];
      updatedTodos[editingIndex] = inputValue;
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else {
      // Otherwise, add a new todo
      setTodos([...todos, inputValue]);
    }
    setInputValue("");
  };

  const handleDelete = (index) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirm) {
      const newTodo = [...todos];
      newTodo.splice(index, 1);
      setTodos(newTodo);
    }
  };

  const handleUpdate = (index) => {
    setEditingIndex(index);
    setInputValue(todos[index]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>To Do App</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add todo...."
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                margin: "0 10px",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              disabled={inputValue.length === 0}
              style={{
                padding: "10px",
                fontSize: "18px",
                margin: "0 10px",
                background: editingIndex !== null ? "#41A5EE" : "#19C37D",
                border: "none",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {editingIndex !== null ? "Update Todo" : "Add To Do"}
            </button>
          </form>
        </div>
        <div>
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                style={{
                  listStyle: "none",
                  margin: "10px 15px",
                  background: "black",
                  color: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                {todo}
                <div>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{
                      margin: "0 10px",
                      background: "#E33E31",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(index)}
                    style={{
                      margin: "0 10px",
                      background: "#1D94D5",
                      color: "white",
                      padding: "10px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
