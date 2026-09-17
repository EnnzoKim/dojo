import { useState } from 'react';

let id = 1;

export default function App() {
  const [curText, setCurText] = useState('');
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={curText}
          onChange={(e) => {
            setCurText(e.target.value);
          }}
          type="text"
          placeholder="Add your task"
        />
        <div>
          <button
            onClick={() => {
              setTodos([
                ...todos,
                {
                  id: id,
                  todo: curText,
                },
              ]);
              id++;
              setCurText('');
            }}
          >
            Submit
          </button>
        </div>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.todo}</span>
            <button
              onClick={() => {
                setTodos(todos.filter((e) => e.id !== todo.id));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
