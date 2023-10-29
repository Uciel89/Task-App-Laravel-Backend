import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext'
import { useEffect } from "react";


import { useNavigate, Link } from 'react-router-dom'
/**
 * @register -> lo vamos a utilizar para registrar inputs dentro del useForm. Al registrar un input nos salteamos la parte de tener
 * que generar estamos individuales para cada input. Ya lo hace por nosotros este hook
 *
 */

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  // Función para mandar los datos de registro a nuestra BACKEND
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <section className="flex  h-[calc(100vh-100px)] justify-center items-center pl-2 pr-2">
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-screen shadow-[0_0px_70px_0px_rgba(0,94,151)]">
        {
          registerErrors.map((error, i) => (
            <div className=" bg-red-500 p-2 text-white rounded-md mt-2" key={i}>
              {error}
            </div>
          ))
        }
        <h1 className=' text-2xl font-bold mb-5'>Regístrate en TaskApp</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("name", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de usuario"
          />
          {errors.username && <p className=" text-red-500"> El nombre de usuario es requerido</p>}
          <input
            type="email"
            {...register("email", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className=" text-red-500"> El email es requerido</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && <p className=" text-red-500"> La contraseña es requerido</p>}
          <button type="submit" className=' bg-blue-600 w-full py-2 rounded-md mt-3 text-ls'> Continuar </button>
        </form>

        <p className='flex gap-x-2 justify-between mt-1'>
          ¿ Tienes cuenta ? <Link to="/" className=' text-blue-500'>Inicia sesión</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
