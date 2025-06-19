import axios from "axios";

const axiosWithCredential = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredential.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredential.put(
    `${MODULES_API}/${module._id}`, 
    module
  );
  return data;
};
