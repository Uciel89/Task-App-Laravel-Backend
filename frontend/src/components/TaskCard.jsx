import { HiCalendarDays } from "react-icons/hi2";
import { MdEdit, MdDelete } from "react-icons/md";
import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";

// Libreria para dar formato a una fecha
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTask();
  return (
    <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-full shadow-[0_0px_0px_0px_rgba(0,94,151)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex items-center ">
          <Link
            to={`/tasks/${task.id}`}
            className="bg-green-700 hover:bg-green-400 rounded-md p-1 ml-2"
          >
            <MdEdit olor="#fafafa" size={24} />
          </Link>
          <button
            onClick={() => {
              Swal.fire({
                title: "¿ Desea borrar esta tarea ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    "Eliminado",
                    "Su tarea a sido eliminada",
                    "success"
                  );
                  deleteTask(task.id);
                }
              });
            }}
            className=" bg-red-700 hover:bg-red-400 rounded-md p-1 ml-2"
          >
            <MdDelete olor="#fafafa" size={24} />
          </button>
        </div>
      </div>
      <p className=" text-gray-200 bg-gray-500 rounded-lg p-2 mt-2">
        {task.description}
      </p>
      <div className="flex items-center w-min mt-2  bg-blue-600 p-1 rounded-lg">
        <HiCalendarDays color="#fafafa" size={24} className="mr-2" />
        <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
      </div>
    </div>
  );
}

export default TaskCard;
