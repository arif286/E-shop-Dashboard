import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
function App() {
  return (
     <div className="App">
      <h1 className="text-3xl font-bold underline">Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
