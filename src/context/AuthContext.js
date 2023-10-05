import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
  uid: null,
  userName: null,
  role: null,
});
