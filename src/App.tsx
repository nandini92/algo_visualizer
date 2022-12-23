import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import GsAlgo from "./components/GsAlgo";
import GlobalStyles from "./GlobalStyles";

const App: React.FC = (): any => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<GsAlgo />} />
        <Route path="/gs-algo" element={<GsAlgo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
