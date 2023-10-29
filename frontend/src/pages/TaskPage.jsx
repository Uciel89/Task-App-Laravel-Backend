import { useEffect, useState } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import Loader from '../components/Loader/Loader'

function TaskPage() {
  const { getTasks, tasks } = useTask();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      getTasks();
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {tasks.length === 0 ? (
            <div className="flex justify-center items-center p-10">
              <div>
                <h1 className="font-bold text-xl">
                  No hay tareas por aquí, agregue una 😀
                </h1>
              </div>
            </div>
          ) : (
            
            <div
              className=" 

            sm:flex
            sm:flex-col
            sm:items-center
            max-sm:flex
            max-sm:flex-col
            max-sm:items-center
            md:grid
            md:grid-cols-2
            md:items-start
            lg:grid-cols-3
            2xl:grid-cols-4
            items-start
            justify-start
            m-4 
            gap-3"
            >
              {tasks.map((task) => (
                <TaskCard task={task} key={task.id} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TaskPage;
