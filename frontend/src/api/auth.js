import axios from './axios'

/**
 * Parte de un axios
 * @axios -> palabra clave para poder establecer las peticiones que vamos a realizar hacia un servio externo
 * @post -> como también pueden ser todos los otros métodos http, es justamente eso
 * 
 * Después dentro los paréntesis vamos a tener dos partes fundamentales, la URL a donde vamos a realizar la petición, y los datos que le vamos a pasar. 
 */

// Peticiones a nuestro backend


export const registerRequest = user => axios.post(`/api/register`, user)
export const loginRequest = user => axios.post(`/api/login`, user)
// export const verifyToken = user => axios.get('/verify')