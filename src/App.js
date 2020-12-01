import './App.css';
import React, { useState, useEffect } from 'react';

//importing components
import Form from './components/Form';
import ToDoList from './components/ToDoList';

function App() {


  //state stuff
  const [inputText, setInputText] = useState ("");
  const [todos, setTodos] = useState ([]);
  const [status, setStatus] = useState (["all"]);
  const [filteredTodods, setFilteredTodos] = useState([]);


  // run once when the app start_url
  useEffect(() => {
    getLocalTodos();
  }, [])
  //use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  //functions 
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () => {
      localStorage.setItem('todos',JSON.stringify(todos))
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') !==null){
      const localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos);
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Kamil's Todo List </h1>
      </header>
      <Form 
        inputText={inputText} 
        setInputText={setInputText} 
        setTodos={setTodos} 
        todos={todos}
        setStatus ={setStatus}
      />
      <ToDoList todos={filteredTodods} setTodos={setTodos} />
    </div>
  );
}

export default App;
