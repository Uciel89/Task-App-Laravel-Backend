import { createContext, useContext, useState } from "react";

import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  deleteTaskRequest,
  updateTaskRequest
} from "../api/task";

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask debería ser usado por un TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      return res
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    try {
      await createTaskRequest(task);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      // Validamos la respuesta del servidor y actualizamos nuestro contexto para no ver mas una tarea que hayamos eliminado. Vamos a crear un arreglo nuevo eliminando el que tenga el mismo id
      const res = await deleteTaskRequest(id);
      if (res.status === 204)
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      await getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        deleteTask,
        getTask,
        updateTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
