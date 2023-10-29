<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use \stdClass;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        // Validamos los datos que provienen del cliente
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Si la validación nos devuelve errores, los retornamos
        if($validator->fails()) 
        {
            return response()->json($validator->errors());
            //return $request;
        }

        // Generamos nuestro usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Creamos el token de autenticación que vamos a devolver en nuestra petición
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retornamos una respuesta
        return response()
            ->json(['data' => $user, 'access_token' => $token, 'token_type' => 'Barer',]);
    }

    public function login (Request $request)
    {
        // Validamos el mail y la contraseña, si no llegan a estar dentro de la base de datos, devolvemos un error 401
        if (!Auth::attempt($request->only('email', 'password')))
        {
            return response()
                ->json(['message'=> 'Email o contraseña incorrecta'], 401);
        }

        // Buscamos ese email y contraseña en nuestra base de datos, por medio del método firstOrFail()
        $user = User::where('email', $request['email'])->firstOrFail();
        
        $token = $user->createToken('auth_token')->plainTextToken;

        // Devolvemos los datos del usuario
        return response()
            ->json([
                'data' => $user,
                'accessToken' => $token,
                'token_type' => 'Bearer',
            ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return[
            'message' => 'Cerraste session'
        ];
    }
}
