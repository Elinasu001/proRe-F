// src/utils/authUtils.js

/**
 * 관리자 권한 체크 (ROLE_ADMIN, ROLE_ROOT)
 */
export const hasAdminAccess = (userRole) => {
  return ["ROLE_ADMIN", "ROLE_ROOT"].includes(userRole);
};

/**
 * 최고 관리자 권한 체크 (ROLE_ROOT)
 */
export const isRootUser = (userRole) => {
  return userRole === "ROLE_ROOT";
};