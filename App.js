import './App.css';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { db } from './firebase_config';
import firebase from 'firebase';
import TodoListItem from './Todo';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    db.collection('todos').onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection('todos').add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });
    setTodoInput('');
  }
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <h1>Todo App</h1>
        <form>
          <TextField
            id="standard-basic"
            label="Let's write a ToDo"
            value={todoInput}
            style={{ width: '25vw', maxWidth: '500px' }}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: 'none' }}
          >
            Default
          </Button>
        </form>
        <div style={{ width: '25vw', maxWidth: '500px', marginTop: '25px' }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
