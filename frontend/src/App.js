import { Routes, Route } from "react-router-dom"
import Home from "./components/Home";

import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
