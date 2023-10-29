import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

// Libreria para dar formato a una fecha
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();

  const { createTask, getTask, updateTask } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", dayjs(task.date).utc().format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit( async (data) => {
    const dataValid = {
      ...data,
      date: data.date 
    }
    
    if (params.id) {
      await updateTask(params.id, dataValid);
    } else {
      await createTask(dataValid);
    }

    navigate("/tasks");
  });

  return (
    <section className="flex h-[calc(100vh-100px)] justify-center items-center ">
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-screen shadow-[0_0px_70px_0px_rgba(0,94,151)]">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            placeholder="Titulo"
            {...register("title")}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            rows="3"
            placeholder="Descripción"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <label htmlFor="date">Fecha</label>
          <input
            type="date"
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("date")}
          />
          <button className=" bg-green-500 w-full py-2 rounded-md mt-3 text-ls">
            Guardar
          </button>
        </form>
      </div>
    </section>
  );
}

export default TaskFormPage;
