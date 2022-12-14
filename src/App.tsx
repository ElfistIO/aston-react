import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/header";
import { Login } from "./pages/login/login";
import { Welcome } from "./pages/welcome/welcome";
import { Footer } from "./components/Footer/footer";
import { SetsPage } from "./pages/sets/setsPage";
import { Account } from "./pages/vault/account";
import { Register } from "./pages/register/register";
import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";
import { AuthContextProvider } from "./services/AuthContext/AuthContext";
import { TelegramContextProvider } from "./services/TelegramContext/TelegramContext";
import { Collection } from "./pages/collection/collection";
import { Error } from "./components/errorBoundary/error";
import { lazy, Suspense } from "react";

import ErrorBoundary from "./components/errorBoundary/errorBoundary";

import "materialize-css/dist/css/materialize.min.css";

const CardPage = lazy(() =>
  import("./pages/card/cardPage").then(({ CardPage }) => ({
    default: CardPage,
  }))
);

const SetPage = lazy(() =>
  import("./pages/set/setPage").then(({ SetPage }) => ({
    default: SetPage,
  }))
);

const SearchResult = lazy(() =>
  import("./pages/searchResult/searchResult").then(({ SearchResult }) => ({
    default: SearchResult,
  }))
);

const WishList = lazy(() =>
  import("./pages/wishList/wishList").then(({ WishList }) => ({
    default: WishList,
  }))
);

function App() {
  return (
    <>
      <TelegramContextProvider>
        <AuthContextProvider>
          <Header />
          <Suspense
            fallback={
              <div className="progress">
                <div className="indeterminate"></div>
              </div>
            }
          >
            <Routes>
              <Route path="*" element={<Error />} />
              <Route path="/" element={<Welcome />} />
              <Route path="/searchResult" element={<SearchResult />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/card" element={<CardPage />} />
              <Route path="/set" element={<SetPage />} />
              <Route path="/sets" element={<SetsPage />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Account />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/collection"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <Collection />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wishList"
                element={
                  <ProtectedRoute>
                    <ErrorBoundary>
                      <WishList />
                    </ErrorBoundary>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
          <Footer />
        </AuthContextProvider>
      </TelegramContextProvider>
    </>
  );
}

export default App;
