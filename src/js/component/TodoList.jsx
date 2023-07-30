import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://playground.4geeks.com/apis/fake/todos/';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/BiancaReset`);
      setTodos(response.data.result); 
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
  
    try {
      const response = await axios.post(`${API_URL}/user/BiancaReset`, {
        label: newTodo,
        done: false,
      });
      setNewTodo('');
      fetchTodos(); // Refresh the todo list after adding a new todo
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodoList = async () => {
    try {
      await axios.put(`${API_URL}/user/BiancaReset`, todos);
      console.log('Todo list updated successfully');
    } catch (error) {
      console.error('Error updating todo list:', error);
    }
  };

  const deleteTodo = async (index) => {
    try {
      const updatedTodos = [...todos];
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      await updateTodoList();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="todo-container">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <span>{todo.label}</span>
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;