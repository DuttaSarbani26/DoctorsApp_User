import { MutationFunction } from "@tanstack/react-query";

import { AxiosInstance } from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";

export type BookAppointmentPayload = {
  doctorId?: string;
  userId?: string;
  name: string;
  date: string;
  time: string;
};

export type BookAppointmentResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export const BookAppointmentFunction: MutationFunction<
  BookAppointmentResponse,
  BookAppointmentPayload
> = async (payload) => {
  const res = await AxiosInstance.post<BookAppointmentResponse>(
    endPoints.doctor.createAppointment,
    payload
  );
  return res.data;
};



