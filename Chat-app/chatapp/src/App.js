import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./componenet/Join/Join";
import Chat from "./componenet/Chat/Chat";
function App() {
  return (
    <div className="App">
      <>
      <Router>
        <Routes>
          <Route exec path="/" element={<Join/>} />
          <Route exec path="/chat" element={<Chat/>} />
        </Routes>
      </Router>
      </>
    </div>
  );
}

export default App;
