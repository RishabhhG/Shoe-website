export const HOST = import.meta.env.VITE_SERVER_URL;
export const AUTH_ROUTE = "api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOG_OUT = `${AUTH_ROUTE}/logout`;
export const PAYMENT = `${AUTH_ROUTE}/payment`;
export const FORGOT_PASSWORD = `${AUTH_ROUTE}/forgot-password`;
export const CHANGE_PASSWORD = `${AUTH_ROUTE}/reset-password`;

export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;