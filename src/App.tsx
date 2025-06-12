import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Matches from "@/pages/Matches";
import News from "@/pages/News";
import Teams from "@/pages/Teams";
import Rankings from "@/pages/Rankings";
import Events from "@/pages/Events";
import Statistics from "@/pages/Statistics";
import Live from "@/pages/Live";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/news" element={<News />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/stats" element={<Statistics />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  );
}

export default App;
