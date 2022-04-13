import { useState } from 'react';
import { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



function TodoInput({ onSubmit, label = "add todo", inputValue }) {
  let [value, setValue] = useState(inputValue);
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          onSubmit(value);
          setValue("");
        }}
      >
        {label}
      </button>
    </div>
  );
}

export function TodoList({ items, onDelete, onChecked, onUpdate }) {
  const [inEdit, setInEdit] = useState(null);
  return (
    <>
      <ul>
        {items.map((item) =>
          inEdit === item.id ? (
            <TodoInput
              inputValue={item.title}
              label="save"
              onSubmit={(value) => {
                onUpdate(item, value);
                setInEdit(null);
              }}
            />
          ) : (
            <TodoItem
              key={item.id}
              value={item}
              onDelete={() => {
                onDelete(item);
              }}
              onChecked={() => {
                onChecked(item);
              }}
              onDoubleClick={(value) => setInEdit(value)}
            >
              {(title) => <span>{title}</span>}
            </TodoItem>
          )
        )}
      </ul>
    </>
  );
}



export function TodoItem({ value, onDelete, onChecked, onDoubleClick }) {
  return (
    <li
      className="list-group-item"
      onDoubleClick={() => onDoubleClick(value.id)}
    >
      <input
        type="checkbox"
        checked={value.isCompleted}
        onChange={() => {
          onChecked(value);
        }}
      />
      {value.title}

      <button onClick={() => onDelete()}>
        X
      </button>
    </li>
  );
}


export function App() {
  const [items, setItems] = useState([]);
  const handleUpdate = (item, value) => {
    setItems(
      items.map((TodoItem) =>
        TodoItem.id === item.id
          ? { ...TodoItem, title: value }
          : TodoItem
      )
    );
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, []);

  return (
    <div>
      <TodoInput
        onSubmit={(value) => {
          setItems([
            ...items,
            { id: Math.random(), title: value, isCompleted: false },
          ]);
        }}
      />
      <TodoList
        items={items}
        onDelete={(item) => {
          setItems(items.filter((TodoItem) => TodoItem.id !== item.id));
        }}
        onChecked={(item) => {
          setItems(
            items.map((TodoItem) =>
              TodoItem.id === item.id
                ? { ...TodoItem, isCompleted: !TodoItem.isCompleted }
                : TodoItem
            )
          );
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
