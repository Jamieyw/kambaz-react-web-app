import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const findQuestionById = async (questionId: string) => {
  const response = await axiosWithCredentials.get(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const updateQuestion = async (questionId: string, question: any) => {
  const response = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${questionId}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};