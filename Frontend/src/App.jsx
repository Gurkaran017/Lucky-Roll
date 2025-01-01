import GamePage from "./components/GamePage";
import HomePage from "./components/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import { useAuth } from "./Context/AuthProvider";

function App() {
  const {AuthUser , setAuthUser} = useAuth();
  return (
    <>
      <div>
        <Routes>
          <Route path="/homepage" element={AuthUser ?  <HomePage/>: <Navigate to= "/"/>}/>
          <Route path="/gamepage" element={AuthUser ?  <GamePage/>: <Navigate to= "/"/>}/>
          <Route path="/"  element={<RegisterPage/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
