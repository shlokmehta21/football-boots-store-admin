import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import SinglePage from "./pages/single/SinglePage";
import New from "./pages/new/NewPage";
import { productInputs, userInputs } from "./formSource";
import "./style/Dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={admin ? <HomePage /> : <Login />} />
            {admin && (
              <>
                <Route path="home" element={<HomePage />} />
                <Route path="users">
                  <Route index element={<List listType="users" />} />
                  <Route path=":userId" element={<SinglePage />} />
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
                </Route>
                <Route path="products">
                  <Route index element={<List listType="products" />} />
                  <Route path=":productId" element={<SinglePage />} />
                  <Route
                    path="new"
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route>{" "}
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
