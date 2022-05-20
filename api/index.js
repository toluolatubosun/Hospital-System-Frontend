import $http from "./xhr";

export const authLogin = async (data) => await $http.post("api/auth/login", data);
export const authRegister = async (data) => await $http.post("api/auth/register", data);

export const userGetMe = async () => await $http.get("api/user/me");

export const patientCreate = async (data) => await $http.post("api/patient/", data);
export const patientSearch = async (text) => await $http.get(`api/patient/search?search=${text}`);
export const patientUpdate = async ({ id, data }) => await $http.put(`api/patient/${id}`, data);
export const patientDelete = async (id) => await $http.delete(`api/patient/${id}`);
export const patientGetById = async (id) => await $http.get(`api/patient/${id}`);