import { useState, useCallback, useEffect } from "react";


let logoutTimer;

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [uid, setUid] = useState(null);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const login = useCallback((id, token, userName, role, expirationDate) => {
    setUid(id);
    setIsLoggedIn(token);
    setUserName(userName);
    setRole(role);
    setToken(token);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: token,
        userName: userName,
        role: role,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUid(null);
    setIsLoggedIn(null);
    setTokenExpirationDate(null);
    setUserName(null);
    setRole(null);
    setToken(null);

    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (isLoggedIn && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isLoggedIn, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.userName, storedData.role, new Date(storedData.expiration));
    }
  }, [login]);

  return {
    isLoggedIn: isLoggedIn,
    token: token,
    login: login,
    logout: logout,
    uid: uid,
    userName: userName,
    role: role,
  };
};
