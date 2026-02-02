import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

/* 스토리지 상수 */
const STORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  userNo: "userNo",
  email: "email",
  userName: "userName",
  nickname: "nickname",
  profileImgPath: "profileImgPath",
  userRole: "userRole",
  status: "status",
  penaltyStatus: "penaltyStatus",
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [auth, setAuth] = useState({
    userNo: null,
    userRole: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  /* 앱 시작 시 로컬 스토리지 복원 */
  useEffect(() => {
    const storedAccessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
    const storedUserNo = localStorage.getItem(STORAGE_KEYS.userNo);

    if (storedAccessToken && storedUserNo) {
      setAuth({
        userNo: Number(storedUserNo),
        userRole: localStorage.getItem(STORAGE_KEYS.userRole),
        accessToken: storedAccessToken,
        refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
        isAuthenticated: true,
      });

      setCurrentUser({
        userNo: Number(storedUserNo),
        email: localStorage.getItem(STORAGE_KEYS.email),
        userName: localStorage.getItem(STORAGE_KEYS.userName),
        nickname: localStorage.getItem(STORAGE_KEYS.nickname),
        profileImgPath: localStorage.getItem(STORAGE_KEYS.profileImgPath),
        userRole: localStorage.getItem(STORAGE_KEYS.userRole),
        status: localStorage.getItem(STORAGE_KEYS.status),
        penaltyStatus: localStorage.getItem(STORAGE_KEYS.penaltyStatus),
      });

      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem(STORAGE_KEYS.userRole) === "ROLE_ADMIN");

      axios.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;
    }
  }, []);

  /* 로그인 */
  const login = (loginResponse) => {
    const logindata = loginResponse?.data?.data;
    if (!logindata) {
      throw new Error("로그인 응답 데이터가 없습니다.");
    }

    const accessToken = logindata.tokens?.accessToken;
    const refreshToken = logindata.tokens?.refreshToken;

    setAuth({
      userNo: logindata.userNo,
      userRole: logindata.userRole,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    setCurrentUser({
      userNo: logindata.userNo,
      email: logindata.email,
      userName: logindata.userName,
      nickname: logindata.nickname,
      profileImgPath: logindata.profileImgPath,
      userRole: logindata.userRole,
      status: logindata.status,
      penaltyStatus: logindata.penaltyStatus,
    });

    setIsLoggedIn(true);
    setIsAdmin(logindata.userRole === "ROLE_ADMIN");

    localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
    localStorage.setItem(STORAGE_KEYS.userNo, String(logindata.userNo));
    localStorage.setItem(STORAGE_KEYS.email, logindata.email ?? "");
    localStorage.setItem(STORAGE_KEYS.userName, logindata.userName ?? "");
    localStorage.setItem(STORAGE_KEYS.nickname, logindata.nickname ?? "");
    localStorage.setItem(STORAGE_KEYS.profileImgPath, logindata.profileImgPath ?? "");
    localStorage.setItem(STORAGE_KEYS.userRole, logindata.userRole ?? "");
    localStorage.setItem(STORAGE_KEYS.status, logindata.status ?? "");
    localStorage.setItem(STORAGE_KEYS.penaltyStatus, logindata.penaltyStatus ?? "");

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  /* 로그아웃 */
  const logout = async () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.accessToken);
  const refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken);

  try {
   
    await axios.post(
      `${apiUrl}/api/auth/logout`,
      { refreshToken }, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, 
          "Content-Type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error("서버 로그아웃 실패", e);
  } finally {
  setAuth({
    userNo: null,
    userRole: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  });

  setIsLoggedIn(false);
  setIsAdmin(false);
  setCurrentUser(null);

  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  delete axios.defaults.headers.common["Authorization"];

  navigate("/");  
  }
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, currentUser, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  return ctx;
};
