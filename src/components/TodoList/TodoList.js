import React, { useState, useEffect } from "react";
import "./TodoList.scss";
import { Input, Button, Checkbox } from "antd";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [editValue, setEditValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const editTodo = (index, newValue) => {
    setEditIndex(index);
    setEditValue(newValue);
  };

  const saveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].name = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditValue("");
  };

  // useEffect(() => {
  //   const storedTodos = localStorage.getItem("todos");
  //   if (storedTodos) {
  //     setTodos(JSON.parse(storedTodos));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const applyFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return todo.completed;
    } else if (filter === "inactive") {
      return !todo.completed;
    }
    return true;
  });

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = { name: inputValue, completed: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setInputValue("");
      localStorage.setItem("todos", JSON.stringify(newTodos)); 
      console.log(newTodos, ("new todos"),Event);
    }
  };

  return (
    <div style={{ justifyContent: "center", alignItems: "center" }}>
      <div className="first-div">
        <h1>تودو لیست</h1>
        <div style={{ display: "block" }} className="first-div__add">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Input
              placeholder="جمله خود را بنویسید..."
              className="first-div__add__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>

          <Button
            style={{
              marginTop: "50px",
              width: "50%",
              backgroundColor: "black",
              color: "white",
              height: "50px",
              borderRadius: "0px",
            }}
            onClick={addTodo}
          >
            افزودن
          </Button>
        </div>
        <div>
          <Button
            style={{
              marginTop: "50px",
              margin: "10px",
              width: "15%",
              border: "1px solid black",
              color: "black",
              height: "50px",
              borderRadius: "0px",
            }}
            onClick={() => applyFilter("all")}
          >
            همه
          </Button>
          <Button
            style={{
              marginTop: "50px",
              margin: "10px",
              width: "15%",
              border: "1px solid black",
              color: "black",
              height: "50px",
              borderRadius: "0px",
            }}
            onClick={() => applyFilter("active")}
          >
            فعال ها
          </Button>
          <Button
            style={{
              marginTop: "50px",
              margin: "10px",
              width: "15%",
              border: "1px solid black",
              color: "black",
              height: "50px",
              borderRadius: "0px",
            }}
            onClick={() => applyFilter("inactive")}
          >
            غیر فعال ها
          </Button>
        </div>

        <p>تعداد وظایف: {filteredTodos.length}</p>
        <ul
          style={{
            listStyle: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {filteredTodos.map((todo, index) => (
            <li
              style={{
                border: "1px dashed black",
                width: "50%",
                height: "100px",
                marginTop: "40px",
                marginLeft: "400px",
              }}
              key={index}
            >
              <Checkbox
                style={{ marginRight: "40px" }}
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              {editIndex === index ? (
                <>
                  <Input
                    style={{ width: "50%", marginTop: "10px" }}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <div>
                    <Button
                      onClick={() => saveTodo(index)}
                      style={{
                        marginRight: "50px",
                        marginTop: "20px",
                        width: "100px",
                      }}
                    >
                      ذخیره
                    </Button>
                    <Button onClick={cancelEdit} style={{ width: "100px" }}>
                      لغو
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {todo.name}
                  <div>
                    <Button
                      onClick={() => editTodo(index, todo.name)}
                      style={{
                        marginRight: "50px",
                        marginTop: "40px",
                        width: "100px",
                      }}
                    >
                      ویرایش
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => deleteTodo(index)}
                      style={{ width: "100px" }}
                      danger
                    >
                      حذف
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
