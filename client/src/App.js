import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./iconImports";
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
  const [isUpdate, setIsUpdate] = useState(null);

  const addToDo = (e) => {
    e.preventDefault();
    if (isUpdate !== null) {
      // Update existing task
      setTasks((oldTasks) =>
        oldTasks.map((task) =>
          task.id === isUpdate ? { ...task, text: newTask } : task
        )
      );
      setIsUpdate(null);
    } else {
      // Add new task
      setTasks([...tasks, { id: tasks.length + 1, text: newTask }]);
    }

    setNewTask("");
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDelete = (taskId) => {
    setTasks((oldTask) => {
      return oldTask.filter((task) => task.id !== taskId);
    });
  };

  const handleUpdate = (taskId) => {
    setIsUpdate(taskId);
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    setNewTask(taskToUpdate.text);
  };

  const handleUpdateSubmit = () => {
    addToDo({ preventDefault: () => {} }); // Simulate form submission
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
        <div className="btn-box">
          <button type="submit">ADD</button>
        </div>
      </form>
      <div className="task-box">
        <ul>
          {tasks?.map((task) => (
            <li key={task.id}>
              {isUpdate === task.id ? (
                <>
                  <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                  />
                  <div className="btn-box">
                    <button onClick={handleUpdateSubmit}>Update</button>
                  </div>
                </>
              ) : (
                <>
                  {task.text}
                  <div>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => handleUpdate(task.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      onClick={() => handleDelete(task.id)}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
