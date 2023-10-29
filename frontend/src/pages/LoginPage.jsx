import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  console.log(signinErrors);

  return (
    <section className="flex  h-[calc(100vh-100px)] justify-center items-center">
      <div className=" bg-zinc-800 max-w-md p-10 rounded-md w-screen shadow-[0_0px_70px_0px_rgba(0,94,151)]">
        {signinErrors.length > 0 ? (
          <div className=" bg-red-500 p-2 text-white rounded-md mt-2">
            {signinErrors}
          </div>
        ) : (
          <></>
        )}
        <h1 className=" text-2xl font-bold mb-5">Bienvenido a TaskApp</h1>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className=" text-red-500"> El email es requerido</p>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className=" w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className=" text-red-500"> La contraseña es requerido</p>
          )}
          <button
            type="submit"
            className=" bg-blue-600 w-full py-2 rounded-md mt-3 text-ls"
          >
            {" "}
            Iniciar Sesión{" "}
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-1">
          ¿ No tienes cuenta ?{" "}
          <Link to="/register" className=" text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
