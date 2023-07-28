import React, { useState, useEffect } from 'react';
import '../../styles/index.css'

const API_URL = 'https://playground.4geeks.com/apis/fake/todos/user/alesanchezr';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos from the API on component mount
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
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
      const response = await axios.post(API_URL, { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="todo-container">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={handleInputChange}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;