import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";

export default function App() {
  return (
    <Router>
      <div className="position-relative min-vh-100 w-100">
       <Routes>
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
