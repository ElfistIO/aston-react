import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Login } from "./pages/login/login";
import { Welcome } from "./pages/welcome/welcome";
import { SearchResult } from "./pages/searchResult/searchResult";
import { Footer } from "./components/Footer/footer";
import { CardPage } from "./pages/card/cardPage";
import { SetPage } from "./pages/set/setPage";
import { SetsPage } from "./pages/sets/setsPage";

import "materialize-css/dist/css/materialize.min.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/set" element={<SetPage />} />
        <Route path="/sets" element={<SetsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
