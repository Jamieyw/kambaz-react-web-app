import axios from "axios";

const axiosWithCredential = axios.create({withCredentials: true});
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: String) => {
  const response = await axiosWithCredential.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredential.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredential.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};