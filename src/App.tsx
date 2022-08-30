import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Login } from "./pages/login/login";
import { Welcome } from "./pages/welcome/welcome";

import "materialize-css/dist/css/materialize.min.css";
import { SearchResult } from "./pages/searchResult/searchResult";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
