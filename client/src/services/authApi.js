import {
  apiRequest,
} from "./apiClient";

export function registerUser(
  payload,
) {
  return apiRequest(
    "/auth/register",
    {
      method: "POST",
      body:
        JSON.stringify(
          payload,
        ),
    },
  );
}

export function loginUser(
  payload,
) {
  return apiRequest(
    "/auth/login",
    {
      method: "POST",
      body:
        JSON.stringify(
          payload,
        ),
    },
  );
}

export function logoutUser() {
  return apiRequest(
    "/auth/logout",
    {
      method: "POST",
    },
  );
}

export function getCurrentUser() {
  return apiRequest(
    "/auth/me",
  );
}

export function forgotPassword(
  email,
) {
  return apiRequest(
    "/auth/forgot-password",
    {
      method: "POST",
      body:
        JSON.stringify({
          email,
        }),
    },
  );
}

export function resetPassword(
  token,
  password,
) {
  return apiRequest(
    "/auth/reset-password",
    {
      method: "POST",
      body:
        JSON.stringify({
          token,
          password,
        }),
    },
  );
}