import React, { useState, useEffect, useRef } from 'react';

const TodoList = () => {
  const [listItem, setListItem] = useState([]);
  const inputRef = useRef(null);

  function addTodo() {
    const value = inputRef.current.value.trim();
    if (value === '') {
      alert('Todo cannot be empty');
    } else {
      setListItem([...listItem, { label: value, done: false }]);
      inputRef.current.value = '';
    }
  }

  async function deleteAllTodos() {
    setListItem([]);
  }

  useEffect(() => {
    updatetodo();
  }, []);

  useEffect(() => {
    newtodo();
  }, [listItem]);

  async function updatetodo() {
    let response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/BiancaReset');
    if (!response.ok) {
      console.error('error');
      return;
    }
    let data = await response.json();
    setListItem(data);
  }

  async function newtodo() {
    if (listItem.length !== 0) {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listItem),
      };
      await fetch('https://playground.4geeks.com/apis/fake/todos/user/BiancaReset', requestOptions);
    }
  }

  const deleteItem = (deleteItem) => {
    console.log(deleteItem);
    const newList = listItem.filter((el) => el.label !== deleteItem.label);
    setListItem(newList);
    console.log(listItem);
  };

  let lista = listItem.map((el, index) => (
    <li key={index}>
      {el.label} <button onClick={() => deleteItem(el)}>Delete</button>
    </li>
  ));

  return (
    <div className="">
      <input type="text" ref={inputRef} />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={deleteAllTodos}>Delete All Todos</button>
      <div>
        <ul>{listItem.length === 0 ? 'no hay tareas' : lista}</ul>
      </div>
    </div>
  );
};

export default TodoList;