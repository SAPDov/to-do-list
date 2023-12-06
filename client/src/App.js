import { useState } from "react";
import "./App.css";

function App() {
  const defaultTodoList = [
    {
      id: 1,
      text: "Read a book",
    },
    {
      id: 2,
      text: "Finish the dishes",
    },
    {
      id: 3,
      text: "Doctor meeting",
    },
  ];

  const [tasks, setTasks] = useState(defaultTodoList);
  const [newTask, setNewTask] = useState("");

  const addToDo = (e) => {
    e.preventDefault();
    setTasks([...tasks, { id: tasks.length + 1, text: newTask }]);
    setNewTask("");
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };
  return (
    <>
      <form onSubmit={addToDo}>
        <label htmlFor="todo">To Do:</label>
        <input
          type="text"
          id="todo"
          name="todo"
          value={newTask}
          onChange={handleInputChange}
        ></input>
        <button type="submit"></button>
      </form>
      <div>
        <ul>
          {tasks?.map((task) => (
            <li key={Math.random()}>{task.text}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
