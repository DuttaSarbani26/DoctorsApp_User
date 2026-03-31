import axios from "@/api/axios/axios";
import { endPoints } from "../endPoints/endPoints";

type DoctorFilterPayload = {
  department?: string[];
  search?: string;
  page?: number;
  limit?: number;
};

export const DoctorListFunction = async (payload: DoctorFilterPayload = {}) => {
  try {
    const { page = 1, limit = 50, search = "", department } = payload;

    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search: search,
    });

    if (department && department.length > 0) {
      department.forEach((dept) => params.append("department", dept));
    }

    const response = await axios.post(
      `${endPoints.doctor.doctorList}?${params.toString()}`,
    );

    return response.data;
  } catch (error: any) {
    console.error("DoctorListFunction error:", error);

    return {
      status: false,
      message: error?.response?.data?.message || "API Error",
      data: [],
    };
  }
};

export const GetDoctorSlotsFunction = async ({
  doctorId,
  date,
}: {
  doctorId: string;
  date: string;
}) => {
  try {
    const response = await axios.post(endPoints.doctor.slots, {
      doctorId,
      date,
    });
    return response.data?.data ?? [];
  } catch (error: any) {
    console.error("GetDoctorSlotsFunction error:", error);
    return [];
  }
};

export const getDoctorsApi = async (
  page: number,
  limit: number,
  search: string,
) => {
  try {
    const response = await axios.get(
      `${endPoints.doctor.doctorList}?page=${page}&limit=${limit}&search=${search}`,
    );

    return response.data;
  } catch (error: any) {
    console.error("getDoctorsApi error:", error);

    return {
      status: false,
      message: error?.response?.data?.message || "API Error",
      data: [],
    };
  }
};
