import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";
import FQA from "./pages/FQA";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
