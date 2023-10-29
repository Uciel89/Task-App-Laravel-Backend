import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest /**verifyToken */ } from "../api/auth.js";

// Librería para comprar cookies
import Cookies from "js-cookie";
/**
 * @createContext -> el contexto nos sirve para guardar datos de forma global para que toda la aplicación los pueda utilizar
 * @provider -> Es un componente que va a englobar a otros
 */

export const AuthContext = createContext();

// Nos sirve para no tener la necesidad de importar en cada archivo que queramos usar este contexto no tengamos que importar el useState y useContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Usuario que va  a ser leído por toda la aplicación
  const [user, setUser] = useState([]);

  // Mediante este estado, vamos a permitir que otras paginas sepan que un usuario a iniciado sesión.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [errors, setErrors] = useState([]);

  // Vamos a crear un loading para esperar la petición de datos de validación del usuario
  const [loading, setLoading] = useState(true);

  // A traves de esta función vamos permitir el registro de usuarios dentro de nuestra aplicación
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.access_token, { expires: 7 });
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('id_user', res.data.data.id);
    } catch (error) {
      
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data.data);
      setIsAuthenticated(true);
      Cookies.set("token", res.data.accessToken, { expires: 7 });
      localStorage.setItem('name', res.data.data.name);
      localStorage.setItem('id_user', res.data.data.id);
      
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('name');
    localStorage.removeItem('id_user')
  }

  // En determinado tiempo, vamos a resetear la lista errors, para retirar los mensajes por pantalla
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      console.log(errors);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
  
      if (token) {
        setIsAuthenticated(true);
      }
  
      setLoading(false); 
    };
  
    checkLogin();
  }, []);

  // Brindamos a nivel global tanto la función signup como el user
  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
