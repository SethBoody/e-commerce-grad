import axios from "axios";

export const BACKUP_HOST = "http://localhost:5000/api";
export const login = (data) => {
  return axios.post(`${BACKUP_HOST}/login`, data);
};

export const register = (data) => {
  return axios.post(`${BACKUP_HOST}/register`, data);
};
