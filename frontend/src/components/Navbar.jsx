import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  const name = localStorage.getItem('name');
  const id_user = localStorage.getItem('id_user');

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-zinc-800">
        <Link
          className="text-3xl font-bold leading-none"
          to={isAuthenticated ? "/tasks" : "/"}
        >
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/task--v1.png"
            alt="task--v1"
          />
        </Link>
        <ul className="  md:hidden max-sm:hidden max-md:hidden lg:visible absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          {isAuthenticated ? (
            <>
              <li>
                <Link
                  to="/tasks"
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Tareas
                </Link>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <Link
                  to="/add-task"
                  className="text-sm text-gray-400 hover:text-gray-500"
                >
                  Agregar Tarea
                </Link>
              </li>
            </>
          ) : (
            <>
            </>
          )}
        </ul>
        <div>
          {isAuthenticated ? (
            <div className=" flex justify-center items-center">
              <h2 className=" mr-2 max-sm:hidden max-md:hidden max-lg:hidden ">
                {/* <strong>{user.username}</strong> */}
                <strong>{name}</strong>
              </h2>
              <img
                width="40"
                height="40"
                src={
                  "https://www.gravatar.com/avatar/" +
                  /* `${user._id}` + */
                  `${id_user}` +
                  "?d=identicon&f=y&s=128"
                }
                alt="experimental-task-completed-papercut"
                className="rounded-full mr-5 max-sm:hidden max-md:hidden max-lg:hidden "
              />
              <Link
                className="lg:inline-block max-sm:hidden md:hidden max-md:hidden py-2 px-6  bg-red-600 mr-5 hover:bg-red-400 text-sm text-white font-bold rounded-xl transition duration-200"
                onClick={() => {
                  logout();
                }}
              >
                Cerrar Sesión
              </Link>
            </div>
          ) : (
            <>
              <Link
                className="lg:inline-block max-sm:hidden md:hidden max-md:hidden lg:ml-auto lg:mr-3 mr-5 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                to="/"
              >
                Sign In
              </Link>
              <Link
                className="lg:inline-block max-sm:hidden md:hidden max-md:hidden py-2 px-6 bg-blue-500 mr-5 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                to="/register"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
        <div className="lg:hidden">
          <button
            onClick={() => {
              setToggleMenu(true);
            }}
            className="navbar-burger flex items-center text-white p-5"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>
      {toggleMenu && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-zinc-800 overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link
                className="mr-auto text-3xl font-bold leading-none"
                to={isAuthenticated ? "/tasks" : "/"}
              >
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/color/48/task--v1.png"
                  alt="task--v1"
                />
              </Link>
              {isAuthenticated ? (
                <>
                  <div className=" flex justify-center items-center">
                    <h2 className=" mr-2">
                      <strong>{name}</strong>
                    </h2>
                    <img
                      width="40"
                      height="40"
                      src={
                        "https://www.gravatar.com/avatar/" +
                        `${name}` +
                        "?d=identicon&f=y&s=128"
                      }
                      alt="experimental-task-completed-papercut"
                      className="rounded-full mr-5 "
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              <button
                className="navbar-close"
                onClick={() => {
                  setToggleMenu(false);
                }}
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                {isAuthenticated ? (
                  <>
                    <li className="mb-1">
                      <Link
                        onClick={() => {
                          setToggleMenu(false);
                        }}
                        className="block p-4 text-sm font-semibold text-gray-400 hover:bg-zinc-700 hover:text-blue-400 rounded"
                        to="/tasks"
                      >
                        Tareas
                      </Link>
                    </li>
                    <li className="mb-1">
                      <Link
                        onClick={() => {
                          setToggleMenu(false);
                        }}
                        className="block p-4 text-sm font-semibold text-gray-400 hover:bg-zinc-700 hover:text-blue-400 rounded"
                        to="/add-task"
                      >
                        Agregar tarea
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                  </>
                )}
              </ul>
            </div>
            <div >
              <div className="pt-6">
                {isAuthenticated ? (
                  <Link
                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center bg-red-600 font-semibold hover:bg-red-400 text-sm text-white rounded-xl"
                    onClick={() => {
                      logout();
                      setToggleMenu(false);
                    }}
                  >
                    Cerrar Sesión
                  </Link>
                ) : (
                  <>
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 text-black hover:bg-gray-100 rounded-xl"
                      to="/"
                      onClick={() => {
                        setToggleMenu(false);
                      }}
                    >
                      Sign in
                    </Link>
                    <Link
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                      to="/register"
                      onClick={() => {
                        setToggleMenu(false);
                      }}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2021</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
