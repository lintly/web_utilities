import "./App.css";
import Home from "./components/sections/Home";
import Base64 from "./components/sections/Base64";
import Localizer from "./components/sections/Localizer";
import JWT from "./components/sections/JWT";
import Colorizer from "./components/sections/Colorizer";
import I18Comparison from "./components/sections/I18Comparison";
import Header from "./components/Header";
import { Routes, Route } from "react-router";
import JsonFormatter from "./components/sections/JsonFormatter";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/base64" element={<Base64 />} />
          <Route path="/localizer" element={<Localizer />} />
          <Route path="/jwt" element={<JWT />} />
          <Route path="/colorizer" element={<Colorizer />} />
          <Route path="/i18comparison" element={<I18Comparison />} />
          <Route path="/formatter" element={<JsonFormatter />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
