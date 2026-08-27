import { useEffect, useState } from "react";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import "./index.css";
import { v4 } from "uuid";
import Title from "./Components/Title.jsx";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Chamar uma API para receber as tarefas da mesma
  /*
  useEffect(() => {
    const fetchTasks = async () => {
      //chamar a api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        },
      );
      //Vai buscar o que ela retorna
      const data = await response.json();

      //Armazenar tarefas
      setTasks(data);
    };
    fetchTasks();
  }, []);*/

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //é necessario atualizar a tarefa
      if (task.id == taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      //Nao é preciso atualizar(como se fosse um else com return=task),neste caso podemos meter logo return
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  function onEditTask(taskId, newTitle, newDescription) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle,
          description: newDescription,
        };
      }
      return task;
    });
    setTasks(newTasks);
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gestor de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
          onEditTask={onEditTask}
        />
      </div>
    </div>
  );
}

export default App;
