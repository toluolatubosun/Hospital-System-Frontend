import $http from "./xhr";

export const authLogin = async (data) => await $http.post("api/auth/login", data);
export const authRegister = async (data) => await $http.post("api/auth/register", data);

export const userGetMe = async () => await $http.get("api/user/me");
