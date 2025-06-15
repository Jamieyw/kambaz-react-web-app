import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const API_BASE = `${REMOTE_SERVER}/api`;

export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(`${API_BASE}/users/${userId}/enrollments`);
  return response.data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${API_BASE}/users/${userId}/enrollments/${courseId}`);
  return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${API_BASE}/users/${userId}/enrollments/${courseId}`);
  return response.data;
};