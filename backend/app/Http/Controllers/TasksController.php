<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use \stdClass;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtiene el usuario autenticado.
        $user = auth()->user();

        // Utiliza la relación "tasks" para obtener las tareas del usuario autenticado.
        $tasks = $user->tasks;

        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $validatedData = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date'
        ]);

        $task = new Tasks;
        $task->title = $request->title;
        $task->description = $request->description;
        $task->date = $request->date;
        $task->user_id = auth()->user()->id;
        $task->save();

        
        $data = [
            'message' => "Tarea creada con éxito",
            'task' => $task
        ];

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show($task)
    {   
        // Obtén el usuario autenticado.
        $user = auth()->user();

        // Utiliza la relación "tasks" para obtener la tarea específica del usuario.
        $task = $user->tasks()->find($task);

        if (!$task) {
            return response()->json(['message' => 'Tarea no encontrada para este usuario'], 404);
        }

        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tasks $tasks)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $tasks)
    {
        //
        $tasks = Tasks::find($tasks);

        if (!$tasks) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }

        if ($tasks->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'No estas autorizado a modificar esta tarea'], 403);
        }

        $tasks->title = $request->title;
        $tasks->description = $request->description;
        $tasks->date = $request->date;
        $tasks->user_id = auth()->user()->id;
        $tasks->save();
        $data = [
            'message' => 'Tarea actualizada con éxito',
            'task'=> $tasks
        ];

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($tasks)
    {
        //
        $tasks = Tasks::find($tasks);

        if (!$tasks) {
            return response()->json(['message' => 'Tarea no encontrada'], 404);
        }
    
        // Asegúrate de que la tarea pertenezca al usuario autenticado.
        if ($tasks->user_id !== auth()->user()->id) {
            return response()->json(['message' => $tasks->user_id], 403);
        }

        // Elimina la tarea.
        $tasks->delete();

        $data = [
            'message' => 'Tarea eliminada con éxito',
            'task' => $tasks
        ];

        return response()->json($data);
    }
}
