import Router from "./route/Index";
import { Routes, Route } from "react-router-dom";
import ThemeProvider from "./layout/provider/Theme";
import Layout from "./layout/Index";
import UserListDefault from "./pages/pre-built/user-manage/UserListDefault";
import AddModal from "./pages/pre-built/user-manage/AddModal";
import PresfastProductCard from "./pages/pre-built/products/PresfastProductCard";
import HungryJackProductCard from "./pages/pre-built/products/HungryJackProductCard";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";

const App = () => {
  const { isLoggedIn, token, login, logout, uid, userName, role } = useAuth();

  let routes;

  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/user-list-default" element={<UserListDefault />}></Route>
          <Route path="/user-contact-card" element={<AddModal />}></Route>
          <Route path="/presfast-list" element={<PresfastProductCard />}></Route>
          <Route path="/hungry-jack-list" element={<HungryJackProductCard />}></Route>
          <Route path="*" element={<Navigate replace to="/user-list-default" />} />
        </Route>
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        login: login,
        logout: logout,
        uid: uid,
        userName: userName,
        role: role,
      }}
    >
      <ThemeProvider>{routes}</ThemeProvider>
    </AuthContext.Provider>
  );
};
export default App;
