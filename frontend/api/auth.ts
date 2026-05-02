const BASE_URL = "http://localhost:8080/api/v1";

export const registerRequest = async (data: any) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.fullName,
      email: data.email,
      password: data.password,
    }),
  });
  return response;
};

export const loginRequest = async (data: any) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
};
