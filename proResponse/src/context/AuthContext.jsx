/* =========================
   AuthContext / AuthProvider
   - 로그인/로그아웃
   - 로컬스토리지 복원
   - axios Authorization 헤더 세팅
   - 응답 인터셉터(인증 만료 처리)
========================= */

import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* Context */
export const AuthContext = createContext();

/* API Base URL */
const apiUrl = window.ENV?.API_URL || "http://localhost:8080";

/* 로컬스토리지 키 상수 */
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

/* 앱 부팅 시 토큰이 있으면 axios 기본 헤더에 세팅 */
const bootToken = localStorage.getItem(STORAGE_KEYS.accessToken);
if (bootToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${bootToken}`;
}

export const AuthProvider = ({ children }) => {
  /* 라우팅 */
  const navigate = useNavigate();

  /* 로그인 상태 플래그 */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  /* 현재 유저(프론트에서 쓰는 최소/확장 정보) */
  const [currentUser, setCurrentUser] = useState(null);

  /* 인증 토큰/권한 최소 상태 */
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
      /* auth 최소 정보 복원 */
      setAuth({
        userNo: Number(storedUserNo),
        userRole: localStorage.getItem(STORAGE_KEYS.userRole),
        accessToken: storedAccessToken,
        refreshToken: localStorage.getItem(STORAGE_KEYS.refreshToken),
        isAuthenticated: true,
      });

      /* currentUser 복원 */
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

      /* 로그인 플래그 복원 */
      setIsLoggedIn(true);
      setIsAdmin(localStorage.getItem(STORAGE_KEYS.userRole) === "ROLE_ADMIN");

      /* axios 헤더 복원 */
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedAccessToken}`;
    }
  }, []);

  /* currentUser 부분 업데이트 (PATCH 성공 후 사용)
   - patch: { nickname, profileImgPath, ... }
   */
  const updateCurrentUser = (patch = {}) => {
    setCurrentUser((prev) => {
      const next = { ...(prev || {}), ...(patch || {}) };

      /* 로컬스토리지 동기화: 들어온 것만 반영 */
      try {
        if (patch.userNo !== undefined)
          localStorage.setItem(STORAGE_KEYS.userNo, String(next.userNo ?? ""));
        if (patch.email !== undefined)
          localStorage.setItem(STORAGE_KEYS.email, next.email ?? "");
        if (patch.userName !== undefined)
          localStorage.setItem(STORAGE_KEYS.userName, next.userName ?? "");
        if (patch.nickname !== undefined)
          localStorage.setItem(STORAGE_KEYS.nickname, next.nickname ?? "");
        if (patch.profileImgPath !== undefined)
          localStorage.setItem(STORAGE_KEYS.profileImgPath, next.profileImgPath ?? "");
        if (patch.userRole !== undefined)
          localStorage.setItem(STORAGE_KEYS.userRole, next.userRole ?? "");
        if (patch.status !== undefined)
          localStorage.setItem(STORAGE_KEYS.status, next.status ?? "");
        if (patch.penaltyStatus !== undefined)
          localStorage.setItem(STORAGE_KEYS.penaltyStatus, next.penaltyStatus ?? "");
      } catch (e) {
        console.error("로컬스토리지 동기화 실패", e);
      }

      /* ROLE 바뀌면 관리자 플래그도 동기화 */
      if (patch.userRole !== undefined) {
        setIsAdmin((next.userRole ?? "") === "ROLE_ADMIN");
      }

      return next;
    });
  };

  /* =========================
     로그인
     - auth/currentUser 세팅
     - 로컬스토리지 저장
     - axios Authorization 세팅
   */
  const login = (loginResponse) => {
    const logindata = loginResponse?.data?.data;
    if (!logindata) {
      throw new Error("로그인 응답 데이터가 없습니다.");
    }

    const accessToken = logindata.tokens?.accessToken;
    const refreshToken = logindata.tokens?.refreshToken;

    /* auth 세팅 */
    setAuth({
      userNo: logindata.userNo,
      userRole: logindata.userRole,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });

    /* currentUser 세팅 */
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

    /* 플래그 세팅 */
    setIsLoggedIn(true);
    setIsAdmin(logindata.userRole === "ROLE_ADMIN");

    /* 로컬스토리지 저장 */
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

    /* axios 헤더 세팅 */
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  };

  /* 
     로그아웃
     - 서버 로그아웃 시도
     - 클라 상태/스토리지/헤더 정리
     - 홈 이동
  */
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
      /* 상태 초기화 */
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

      /* 스토리지/헤더 정리 */
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
      delete axios.defaults.headers.common["Authorization"];

      /* 이동 */
      navigate("/");
    }
  };

  /*
     응답 인터셉터
     - 인증 만료/권한 문제로 판단되면 강제 로그아웃 처리
     - 특정 요청은 skipAuthErrorHandler로 스킵 가능
  */
  useEffect(() => {
    const id = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        const status = err?.response?.status;
        const url = err?.config?.url || "";
        const msg = err?.response?.data?.message || "";

        /* 0) 요청별 스킵 */
        if (err?.config?.skipAuthErrorHandler) {
          return Promise.reject(err);
        }

        /* 1) 로그인 요청 자체는 제외 */
        const isLoginRequest = url.includes("/api/auth/login");
        if (isLoginRequest) return Promise.reject(err);

        /* 2) 401/403일 때 "비번 불일치" 때 페이지를 벗어나지 않도록 */
        const looksLikePasswordMismatch = msg.includes("비밀번호");
        if (looksLikePasswordMismatch) return Promise.reject(err);

        /* 3) "인증 만료"로 간주하고 처리 */
        if (status === 401 || status === 403) {
          /* localStorage.clear() 대신 인증키만 제거 */
          Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
          delete axios.defaults.headers.common.Authorization;

          window.location.replace("/auth/loginForm");
          return;
        }

        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(id);
  }, []);

  /* Provider 주입 */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        currentUser,
        auth,
        login,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* AuthContext Hook */
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  return ctx;
};
