import { AxiosInstance } from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export async function getHistory(params?: { userId?: string; doctorId?: string }) {
  const res = await AxiosInstance.get(endPoints.doctor.appointmentHistory, { params });
  return res.data;
}

export default getHistory;