import React, { useState, useEffect } from "react";

import cross from "../images/icon-cross.svg";
import "../style/to_do_list.css";

export default function Header({themeChange}) {
  const [data, setDataItem] = useState([]);

  const [value, setValue] = useState();
  const [currentState, setTabState] = useState("");

  var itemsLeft = 0;


  const setData = (event) => {
    setValue(event.target.value);
  };


  const add = (e) => {
    e.preventDefault();
    if(value!==""){
    setDataItem([
      ...data,
      { text: value, completed: false, id: new Date().getTime() },
    ])
    }
    setValue(value);
  };
 
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("key"));
    if (todos) {
      setDataItem(todos);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(data));
  }, [data]);

  const toggleId = (id) => {
    const newid = data.map((data) =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    
    setDataItem(newid);
  };

  const clearComplete = () => {
    const updatedTodos = data.filter((val) => {
      if (val.completed == false) {
        return val;
      }
    });
    setDataItem(updatedTodos);
  };
 
  const removeItem = (id) => {
 
    const updatedTodo = data.filter((val) => {
      if (val.id !== id) {
        return val;
      }
    });
   setDataItem(updatedTodo);
  };

 
  const activeTab = (e) => {
    setTabState(e.target.textContent);
  };

  const leftItems = () => {
    const updatedTodos = data.filter((data) => !data.completed);
    itemsLeft = updatedTodos.length;
    return updatedTodos.length;
  };

  return (
    <div className="Theme">
      <div className="to_do">
      
        <div className="title">
          <span>todo</span>
          <span>
            <img src="images/icon-moon.svg" alt="" id="image" onClick={themeChange}/>
          </span>
        </div>
        <div className="input_field">
          <form onSubmit={add}>
            <input
              type="text"
              placeholder="Create a new todo..."
              onChange={setData}
            />
          </form>
        </div>
      </div>
      <div className="result_main">
        <div className="results">
          <ul className="list">
            {data.map((val, i) => {
              if (currentState === "All" || currentState==="") {
                return (
                  <li key={i}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={val.completed}
                      onClick={() => toggleId(val.id)}
                    />
                    {val.text}
                    <img
                      src={cross}
                      alt=""
                      className="cross"
                      onClick={() => removeItem(val.id)}
                    />
                  </li>
                );
              } else if (currentState === "Active") {
                if (!val.completed) {
                  return (
                    <li key={i}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={val.completed}
                        onClick={() => toggleId(val.id)}
                      />
                      {val.text}
                      <img
                        src={cross}
                        alt=""
                        className="cross"
                        onClick={() => removeItem(val.id)}
                      />
                    </li>
                  );
                }
              } else if (currentState === "Completed") {
                if (val.completed) {
                  return (
                    <li key={i}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={val.completed}
                        onClick={() => toggleId(val.id)}
                      />
                      {val.text}
                      <img
                        src={cross}
                        alt=""
                        className="cross"
                        onClick={() => removeItem(val.id)}
                      />
                    </li>
                  );
                }
              }
            })}
          </ul>

         
        </div>
      </div>
      <div className="btn-wrp">
      <div className="btns">
            <div>{leftItems()} items</div>
            <div className="function">
              <div onClick={activeTab} id={currentState === "All"}>
                All
              </div>
              <div onClick={activeTab} id={currentState === "Active"}>
                Active
              </div>
              <div onClick={activeTab} id={currentState === "Completed"}>
                Completed
              </div>
            </div>
            <div onClick={clearComplete}>Clear Completed</div>
          </div>
          </div>
    </div>
  );
}
